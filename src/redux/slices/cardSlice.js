import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cardServices } from "@/services/cardServices";

// Fetch all cards

export const fetchAllCards = createAsyncThunk(
  "cards/fetchAll",
  async ({ token }, { rejectWithValue }) => {
    try {
      return await cardServices.getAllCards({ token });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch a specific card
export const fetchCardById = createAsyncThunk(
  "cards/fetchById",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await cardServices.getSpecificCard({ id, token });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fund a card
export const fundCard = createAsyncThunk(
  "cards/fundCard",
  async ({ id, payload, token }, { rejectWithValue }) => {
    try {
      return await cardServices.fundCard({ id, payload, token });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    allCards: [],
    currentCard: null,
    loading: false,
    error: null,
    lastFetched: null, // add this
  },

  reducers: {
    clearCurrentCard: (state) => {
      state.currentCard = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllCards
      .addCase(fetchAllCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCards.fulfilled, (state, action) => {
        state.loading = false;
        state.allCards = action.payload;
        state.lastFetched = Date.now(); // store timestamp
      })
      .addCase(fetchAllCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchCardById
      .addCase(fetchCardById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCardById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCard = action.payload;
      })
      .addCase(fetchCardById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fundCard
      .addCase(fundCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fundCard.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCard = action.payload;
        // optionally update allCards if needed
        const index = state.allCards.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) state.allCards[index] = action.payload;
      })
      .addCase(fundCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentCard } = cardSlice.actions;
export default cardSlice.reducer;
