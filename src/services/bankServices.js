import { getFallbackRouteParams } from "next/dist/server/request/fallback-params";
import api from "./api";

export const bankServices = {
  getAllBanks: async () => {
    const { data } = await api.get("wallet/banks");
    return data;
  },

  addBankAccount: async ({ formData, token }) => {
    console.log("hello", formData);
    const { data } = await api.post(`api/all/add-bank`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getUserBankAccount: async ({ payload, token }) => {
    const { data } = await api.get(
      `api/all/user-Bank`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  depositToBank: async ({ payload, token }) => {
    const { data } = await api.post(
      `wallet/deposit/bank`,
      { payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
};
