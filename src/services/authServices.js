// services/authService.js
import api from "./api";

export const authService = {
  login: async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    return data;
  },

  signup: async (payload) => {
    const { data } = await api.post("/auth/signup", payload);
    return data;
  },

  forgotPassword: async (payload) => {
    const { data } = await api.post("/auth/forgot-password", payload);
    return data;
  },

  resetPassword: async (payload) => {
    const { data } = await api.post("/auth/reset-password", payload);
    return data;
  },

  resendOtp: async (payload) => {
    const { data } = await api.post("/auth/resend-otp", payload);
    return data;
  },
};
