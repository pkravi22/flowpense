import { expenseServices } from "@/services/expenseServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { expenseServices } from "@/services/expenseServices"; // Adjust import path as needed

// Fetch all expenses
export const fetchAllExpenses = createAsyncThunk(
  "expenses/fetchAll",
  async ({ token }, { rejectWithValue }) => {
    try {
      return await expenseServices.getAllExpense({ token });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Fetch expenses by specific card
export const fetchExpensesByCard = createAsyncThunk(
  "expenses/fetchByCard",
  async ({ cardId, token }, { rejectWithValue }) => {
    try {
      return await expenseServices.getExpenseDetailsByCard({ cardId, token });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    allExpenses: [],
    cardExpenses: [], // Expenses for a specific card
    loading: false,
    error: null,
    lastFetched: null,
  },
  reducers: {
    clearCardExpenses: (state) => {
      state.cardExpenses = [];
      state.error = null;
    },
    // Add other synchronous reducers as needed
  },
  extraReducers: (builder) => {
    builder
      // fetchAllExpenses
      .addCase(fetchAllExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.allExpenses = action.payload;
        state.lastFetched = Date.now();
      })
      .addCase(fetchAllExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchExpensesByCard
      .addCase(fetchExpensesByCard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpensesByCard.fulfilled, (state, action) => {
        state.loading = false;
        state.cardExpenses = action.payload;
      })
      .addCase(fetchExpensesByCard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCardExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
