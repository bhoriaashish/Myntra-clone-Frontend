import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
  resetToken: null,
  isEmailSent: false,
  isPasswordReset: false,

  signup: {
    loading: false,
    error: null,
    success: false,
  },
  login: {
    loading: false,
    error: null,
    success: false,
  },
  forgotPassword: {
    loading: false,
    error: null,
    success: false,
  },

  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Signup Reducers
    signupRequest(state) {
      state.signup.loading = true;
      state.signup.error = null;
      state.signup.success = false;
    },
    signupSuccess(state, action) {
      state.signup.loading = false;
      state.signup.success = true;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signupFailure(state, action) {
      state.signup.loading = false;
      state.signup.error = action.payload;
      state.signup.success = false;
    },
    resetSignup(state) {
      state.signup = { loading: false, error: null, success: false };
    },

    // Login Reducers
    loginRequest(state) {
      state.login.loading = true;
      state.login.error = null;
      state.login.success = false;
    },
    loginSuccess(state, action) {
      state.login.loading = false;
      state.login.success = true;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure(state, action) {
      state.login.loading = false;
      state.login.error = action.payload;
      state.login.success = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    resetLogin(state) {
      state.login = { loading: false, error: null, success: false };
    },

    // Forgot Password Reducers
    forgotPasswordRequest(state) {
      state.forgotPassword.loading = true;
      state.forgotPassword.error = null;
      state.forgotPassword.success = false;
    },
    forgotPasswordSuccess(state) {
      state.forgotPassword.loading = false;
      state.forgotPassword.success = true;
    },
    forgotPasswordFailure(state, action) {
      state.forgotPassword.loading = false;
      state.forgotPassword.error = action.payload;
      state.forgotPassword.success = false;
    },
    resetForgotPassword(state) {
      state.forgotPassword = { loading: false, error: null, success: false };
    },

    // Logout
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.login = { loading: false, error: null, success: false };
      state.signup = { loading: false, error: null, success: false };
    },
  },
});

export const {
  signupRequest,
  signupSuccess,
  signupFailure,     
  resetSignup,
  loginRequest,
  loginSuccess,
  loginFailure,
  resetLogin,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetForgotPassword,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
