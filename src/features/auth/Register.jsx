import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signupRequest,
  signupSuccess,
  signupFailure,
} from './AuthSlice'; // adjust path as needed
import {
  CircularProgress,
  Alert,
} from '@mui/material';
import { Navigation, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(state => state.auth.signup);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      dispatch(signupFailure('Passwords do not match'));
      return;
    }

    dispatch(signupRequest());

    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', formData, {
        withCredentials: true,
      });

      dispatch(signupSuccess(res.data.user));
      navigate('/login');

    } catch (err) {
      dispatch(signupFailure(err.response?.data?.message || 'Registration failed'));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-black p-5 sm:p-8 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Create Account
        </h2>

        {error && (
          <div className="mb-4">
            <Alert severity="error">{error}</Alert>
          </div>
        )}
        {success && (
          <div className="mb-4">
            <Alert severity="success">Registration successful!</Alert>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>

          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold rounded-xl transition duration-200"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Register'
            )}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-300">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
