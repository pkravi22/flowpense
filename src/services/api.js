// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  withCredentials: true,
});

// ✅ Add Authorization + platform before every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["platform"] = "web";
  return config;
});

// ============================================================
// 🔁 TOKEN REFRESH LOGIC
// ============================================================
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

const redirectToLogin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};

// Intercept 401 errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🧩 Avoid infinite loop on refreshToken call
    if (originalRequest.url.includes("/auth/refreshToken")) {
      redirectToLogin();
      return Promise.reject(error);
    }

    // ✅ Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for refresh to complete if already in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const oldRefreshToken = localStorage.getItem("refreshToken");
        if (!oldRefreshToken) {
          redirectToLogin();
          return Promise.reject(error);
        }

        // 🔥 Request new access & refresh tokens
        const { data } = await axios.post(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"
          }/api/auth/refreshToken`,
          { refreshToken: oldRefreshToken },
          { withCredentials: true }
        );

        // ✅ Expected response:
        // {
        //   "accessToken": "newAccessToken",
        //   "refreshToken": "newRefreshToken"
        // }

        const { accessToken, refreshToken } = data;

        if (accessToken && refreshToken) {
          // Store both updated tokens
          localStorage.setItem("token", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Update axios defaults
          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          processQueue(null, accessToken);

          // Retry the failed request with new access token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } else {
          throw new Error("Invalid refresh response");
        }
      } catch (err) {
        processQueue(err, null);
        redirectToLogin();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // Reject all other errors normally
    return Promise.reject(error);
  }
);

export default api;
