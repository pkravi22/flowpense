// services/authService.js
import api from "./api";

export const authService = {
  signin: async (payload) => {
    const { data } = await api.post("api/auth/login", payload);
    return data;
  },

  signup: async (payload) => {
    console.log("payload :",payload)
    const { data } = await api.post("api/auth/register", payload);
    return data;
  },
  verifyEmail: async ({ otp, token }) => {
    // Send OTP in body and token in Authorization header
    const { data } = await api.post(
      "/api/auth/verify-email",
      { otp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },


  forgotPassword: async (payload) => {
    const { data } = await api.post("/api/auth/forgot-password", payload);
    return data;
  },
  verifyForgetPasswordOtp:async ({otpCode,token}) => {
    const { data } = await api.post("api/auth/verify/forgot-pass-otp",
      { otpCode },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
