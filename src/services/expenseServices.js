import api from "./api";
export const expenseServices = {
  createExpense: async ({ payload, token }) => {
    const { data } = await api.post(
      "api/expenses/create-expense",
      { payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
  getExpenseDetailsByCard: async ({ id, token }) => {
    const { data } = await api.get(
      `api/expenses/card/${id}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },

  getAllExpense: async ({ id, token }) => {
    const { data } = await api.get(
      "api/expenses/all-expenses",

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },
};
