import api from "./api";

export const cardServices = {
  createCard: async ({ payload, id }) => {
    console.log("payload", payload);
    const { data } = await api.post("api/cards/create-card", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  fundCard: async ({ payload, id }) => {
    console.log("payload", payload);
    const { data } = await api.post("api/funds/card", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  getAllCards: async ({ payload, id }) => {
    console.log("payload", payload);
    const { data } = await api.post("api/cards/all-cards", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  getSpecificCard: async ({ token, id }) => {
    console.log("payload", payload);
    const { data } = await api.post(`api/cards/all-cards/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  blockUnlockCard: async ({ token, id }) => {
    console.log("payload", payload);
    const { data } = await api.post(
      "api/cards/block-unblock-card/${id}",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  },

  editCardLimit: async ({ payload, id }) => {
    console.log("payload", payload);
    const { data } = await api.post(
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
};
