import api from "./api";

export const otherServices = {
  // Get User Profile
  getProfile: async ({ token }) => {
    const { data } = await api.get("api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  getNotification: async ({ token }) => {
    console.log("token in top", token);
    const { data } = await api.get(
      "api/notifications/get-notification",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
};
