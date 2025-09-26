// services/authService.js
import api from "./api";

export const authService = {
  signin: async (payload) => {
    console.log("payload",payload)
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
      "api/auth/verify-email",
      { otp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },


forgotPassword: async ({ email }) => {
  console.log("email:", email)
  const { data } = await api.post("api/auth/forgot-password", { email });
  return data;
},
  verifyForgetPasswordOtp:async ({otpCode,token}) => {
    console.log(otpCode,token)
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
    const { data } = await api.post("api/auth/reset-password", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });;
    return data;
  },


  resendOtp: async (paylo) => {
    const { data } = await api.post("/auth/resend-otp", payload);
    return data;
  },
};

 enable2fa=async(payload)=>{
       const { data } = await api.post("/api/mfa/generate-secret", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return data;
 }
  verify2fa=async({otpcode,token})=>{
       const { data } = await api.post("/api/mfa/generate-secret", 
         {
      token: otpcode, 
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // 
      },
    }
      );
    return data;
 }
