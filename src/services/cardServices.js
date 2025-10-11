import api from "./api";

export const cardServices = {
  createCard: async ({ apiData, token }) => {
    console.log("payload", apiData);
    const { data } = await api.post("api/cards/create-card", apiData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  },

  fundCard: async ({ token, payload }) => {
    console.log("payload", payload);
    const { data } = await api.post("api/funds/card", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  getAllCards: async ({ token }) => {
    const { data } = await api.get("api/cards/all-cards", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  getSpecificCard: async ({ token, id }) => {
    console.log("payload", payload);
    const { data } = await api.get(`api/cards/all-cards/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  blockUnlockCard: async ({ token, id, action }) => {
    console.log("payload", id, action);
    const { data } = await api.patch(
      "api/cards/block-unblock-card/${id}",
      { action },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },

  editCardLimit: async ({ payload, token, id }) => {
    console.log("payload", payload);
    const { data } = await api.patch(
      `api/cards/edit-card-limits/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },

  deleteCard: async ({ token, id }) => {
    const { data } = await api.delete(`api/cards/delete-card/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  transactionHistoryByCard: async ({ token, id }) => {
    const { data } = await api.get(`api/cards/transaction-history/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
};

