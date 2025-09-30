import api from "./api";

export const authService = {
  registerCompany: async (payload) => {
    console.log("payload", payload);
    const { data } = await api.post("api/companies/register", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  uploadKYC: async (payload) => {
    console.log("payload", payload);
    const { data } = await api.post("api/companies/upload-kyc", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  walletTopup: async (payload) => {
    console.log("payload", payload);
    const { data } = await api.post("wallet/topup", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
  getCompanyInfo: async ({ id }) => {
    console.log("payload", payload);
    const { data } = await api.get(`api/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  getWalletLedger: async ({ id }) => {
    console.log("payload", payload);
    const { data } = await api.get(`wallet/ledger?companyId=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
};
