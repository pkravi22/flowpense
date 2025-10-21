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

  uploadKYC: async ({ formData, token }) => {
    console.log("payload", formData);
    const { data } = await api.post("api/companies/upload-kyc", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  createPayment: async ({ payload, token }) => {
    console.log("payload", payload);
    const { data } = await api.post("wallet/create/payment", payload, {
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
