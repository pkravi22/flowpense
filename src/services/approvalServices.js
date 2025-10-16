import api from "./api";

export const approvalServices = {
  approveExpense: async ({ payload, token }) => {
    const data = api.post(
      "api/approvals/approve-expense",
       payload ,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
  getPendingApprovals: async ({ token }) => {
    const data = api.get(
      "api/approvals/pending-approvals",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
  getApprovedApprovals: async ({ token }) => {
    const data = api.post(
      "/api/approvals/approved-expenses",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
  getRejectedApprovals: async ({ token }) => {
    const data = api.post(
      "api/approvals/rejected-expenses",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },

  getAllExpenses: async ({ token }) => {
    const data = api.get(
      "api/approvals/all-expenses",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
};
