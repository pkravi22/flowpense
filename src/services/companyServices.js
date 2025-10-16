import api from "./api";

export const companyServices = {
  registerCompany: async ({ payload, token }) => {
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

  walletTopup: async ({ payload, token }) => {
    console.log("payload", payload);
    const { data } = await api.post("wallet/topup", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
  getCompanyInfo: async ({ id, token }) => {
    console.log(id);
    const { data } = await api.get(`api/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  getWalletLedger: async ({ token, companyId }) => {
    console.log(token);
    const { data } = await api.get(`wallet/ledger?companyId=${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
};
