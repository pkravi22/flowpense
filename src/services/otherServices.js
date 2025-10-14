import api from "./api";
export const otherServices = {
  getProfile: async ({ token }) => {
    const data = api.post(
      "api/auth/profile",
      { payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
};
