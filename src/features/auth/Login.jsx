import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  resetLogin,
} from './AuthSlice'; // adjust path as per your folder structure
import {
  // TextField,
  // Button,
  // InputAdornment,
  // IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(state => state.auth.login);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(loginRequest());

    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', formData, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(loginSuccess(res.data.user));
        localStorage.setItem('token', res.data.token);
      } else {
        dispatch(loginFailure(res.data.message || 'Login failed'));
      }
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Login failed'));
    }
  };
  useEffect(()=>{
    if(success){
      const timer = setTimeout(() => {
        navigate('/');
      },1000);
      return () => clearTimeout(timer)
    }
  },[success, navigate])

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(resetLogin());
      }, 3000); // Reset success/error after 3s

      return () => clearTimeout(timer); // cleanup
    }
  }, [success, error, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-200 to-purple-300 px-4">
      <div className="bg-black p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Login</h2>

        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        {success && <Alert severity="success" className="mb-4">Login successful!</Alert>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            required
            className="w-full px-4 py-3 rounded-xl bg-neutral-900 text-white placeholder-gray-400 focus:outline-none"
          />

          {/* Password with toggle */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-3 rounded-xl bg-neutral-900 text-white placeholder-gray-400 focus:outline-none"
            />
            <div
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold transition duration-300 disabled:opacity-60"
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </button>

          {/* Forgot Password */}
          <p className="text-sm text-center text-gray-400">
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </p>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-400">
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
  
  
};

export default Login;
