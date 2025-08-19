import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from './AuthSlice';
import { CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector(
    state => state.auth.forgotPassword
  );

  const [step, setStep] = useState(1); // 1 = email step, 2 = new password step
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');

  // Step 1: Verify Email
  const handleEmailSubmit = async e => {
    e.preventDefault();
    dispatch(forgotPasswordRequest());
  
    try {
      const res = await axios.post('http://localhost:8080/api/auth/forgot-password', { email });
  
      if (res.data.success) {
        dispatch(forgotPasswordSuccess());
        setResetToken(res.data.token); // Save token here
        setStep(2);
      } else {
        dispatch(forgotPasswordFailure(res.data.message || 'Email not found'));
      }
    } catch (err) {
      dispatch(
        forgotPasswordFailure(err.response?.data?.message || 'Something went wrong')
      );
    }
  };

  // Step 2: Update Password
  const handlePasswordSubmit = async e => {
    e.preventDefault();
  
    if (newPassword !== confirmPassword) {
      return dispatch(forgotPasswordFailure("Passwords do not match"));
    }
  
    if (!resetToken) {
      return dispatch(forgotPasswordFailure("Missing reset token"));
    }
  
    dispatch(forgotPasswordRequest());
  
    try {
      const res = await axios.post('http://localhost:8080/api/auth/reset-password', {
        token: resetToken,
        newPassword,
        confirmPassword,
      });
  
      if (res.data.success) {
        dispatch(forgotPasswordSuccess());
        alert('Password updated successfully!');
        // reset form and state
        setStep(1);
        setEmail('');
        setNewPassword('');
        setConfirmPassword('');
        setResetToken('');
        navigate('/login');
      } else {
        dispatch(forgotPasswordFailure(res.data.message || 'Failed to update password'));
      }
    } catch (err) {
      dispatch(
        forgotPasswordFailure(err.response?.data?.message || 'Something went wrong')
      );
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-200 to-purple-300 px-4">
      <div className="bg-black p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {step === 1 ? 'Forgot Password' : 'Set New Password'}
        </h2>

        {error && <Alert severity="error" className="mb-4">{error}</Alert>}
        {success && step === 1 && (
          <Alert severity="success" className="mb-4">
            Email verified. Please enter a new password.
          </Alert>
        )}

        {step === 1 ? (
          <form onSubmit={handleEmailSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-1 text-white text-sm font-medium">
                Email address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-[#111] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium py-3 rounded-xl transition"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Next'}
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-white text-sm font-medium">
                New Password
              </label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-xl bg-[#111] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-white text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-xl bg-[#111] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-medium py-3 rounded-xl transition"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
