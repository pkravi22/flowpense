import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { approvalServices } from "@/services/approvalServices";

export const fetchPendingApprovals = createAsyncThunk(
  "approvals/fetchPending",
  async (token, { rejectWithValue }) => {
    try {
      return await approvalServices.getPendingApprovals({ token });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchApprovedRequests = createAsyncThunk(
  "approvals/fetchApproved",
  async (token, { rejectWithValue }) => {
    try {
      return await approvalServices.getApprovedRequests({ token });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchRejectedRequests = createAsyncThunk(
  "approvals/fetchRejected",
  async (token, { rejectWithValue }) => {
    try {
      return await approvalServices.getRejectedRequests({ token });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchAllExpenses = createAsyncThunk(
  "approvals/fetchAllExpenses",
  async (token, { rejectWithValue }) => {
    try {
      return await approvalServices.getAllExpenses({ token });
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const approveExpense = createAsyncThunk(
  "approvals/approve",
  async ({ payload, token }, { rejectWithValue }) => {
    try {
      const response = await approvalServices.approveExpense({
        payload,
        token,
      });
      return { expenseId, approvedExpense: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const rejectExpense = createAsyncThunk(
  "approvals/reject",
  async ({ payload, token }, { rejectWithValue }) => {
    try {
      const response = await approvalServices.approveExpense({
        payload,
        token,
      });
      return { expenseId, approvedExpense: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const approvalSlice = createSlice({
  name: "approvals",
  initialState: {
    allExpenses: [],
    pendingExpenses: [],
    approvedExpenses: [],
    rejectedExpenses: [],
    loading: false,
    loadingAll: false,
    loadingPending: false,
    loadingApproved: false,
    loadingRejected: false,
    loadingAction: false,
    error: null,
    errorAll: null,
    errorPending: null,
    errorApproved: null,
    errorRejected: null,
    errorAction: null,
    lastFetched: null,
    lastFetchedAll: null,
    lastFetchedPending: null,
    lastFetchedApproved: null,
    lastFetchedRejected: null,
  },

  reducers: {
    clearAllErrors: (state) => {
      state.error = null;
      state.errorAll = null;
      state.errorPending = null;
      state.errorApproved = null;
      state.errorRejected = null;
      state.errorAction = null;
    },

    clearAllExpenses: (state) => {
      state.allExpenses = [];
      state.pendingExpenses = [];
      state.approvedExpenses = [];
      state.rejectedExpenses = [];
    },

    updateExpenseStatus: (state, action) => {
      const { expenseId, newStatus, updatedData } = action.payload;

      state.pendingExpenses = state.pendingExpenses.filter(
        (exp) => exp.id !== expenseId
      );
      state.approvedExpenses = state.approvedExpenses.filter(
        (exp) => exp.id !== expenseId
      );
      state.rejectedExpenses = state.rejectedExpenses.filter(
        (exp) => exp.id !== expenseId
      );

      const expenseIndex = state.allExpenses.findIndex(
        (exp) => exp.id === expenseId
      );
      if (expenseIndex !== -1) {
        state.allExpenses[expenseIndex] = {
          ...state.allExpenses[expenseIndex],
          ...updatedData,
          status: newStatus,
        };
      }

      const updatedExpense = {
        ...updatedData,
        id: expenseId,
        status: newStatus,
      };
      if (newStatus === "approved") {
        state.approvedExpenses.unshift(updatedExpense);
      } else if (newStatus === "rejected") {
        state.rejectedExpenses.unshift(updatedExpense);
      } else if (newStatus === "pending") {
        state.pendingExpenses.unshift(updatedExpense);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllExpenses.pending, (state) => {
        state.loadingAll = true;
        state.errorAll = null;
      })
      .addCase(fetchAllExpenses.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.allExpenses = action.payload;
        state.lastFetchedAll = Date.now();
      })
      .addCase(fetchAllExpenses.rejected, (state, action) => {
        state.loadingAll = false;
        state.errorAll = action.payload;
      })
      .addCase(fetchPendingApprovals.pending, (state) => {
        state.loadingPending = true;
        state.errorPending = null;
      })
      .addCase(fetchPendingApprovals.fulfilled, (state, action) => {
        state.loadingPending = false;
        state.pendingExpenses = action.payload;
        state.lastFetchedPending = Date.now();
      })
      .addCase(fetchPendingApprovals.rejected, (state, action) => {
        state.loadingPending = false;
        state.errorPending = action.payload;
      })
      .addCase(fetchApprovedRequests.pending, (state) => {
        state.loadingApproved = true;
        state.errorApproved = null;
      })
      .addCase(fetchApprovedRequests.fulfilled, (state, action) => {
        state.loadingApproved = false;
        state.approvedExpenses = action.payload;
        state.lastFetchedApproved = Date.now();
      })
      .addCase(fetchApprovedRequests.rejected, (state, action) => {
        state.loadingApproved = false;
        state.errorApproved = action.payload;
      })
      .addCase(fetchRejectedRequests.pending, (state) => {
        state.loadingRejected = true;
        state.errorRejected = null;
      })
      .addCase(fetchRejectedRequests.fulfilled, (state, action) => {
        state.loadingRejected = false;
        state.rejectedExpenses = action.payload;
        state.lastFetchedRejected = Date.now();
      })
      .addCase(fetchRejectedRequests.rejected, (state, action) => {
        state.loadingRejected = false;
        state.errorRejected = action.payload;
      })
      .addCase(approveExpense.pending, (state) => {
        state.loadingAction = true;
        state.errorAction = null;
      })
      .addCase(approveExpense.fulfilled, (state, action) => {
        state.loadingAction = false;
        const { expenseId, approvedExpense } = action.payload;

        state.pendingExpenses = state.pendingExpenses.filter(
          (exp) => exp.id !== expenseId
        );

        state.approvedExpenses.unshift(approvedExpense);

        const index = state.allExpenses.findIndex(
          (exp) => exp.id === expenseId
        );
        if (index !== -1) {
          state.allExpenses[index] = approvedExpense;
        }
      })
      .addCase(approveExpense.rejected, (state, action) => {
        state.loadingAction = false;
        state.errorAction = action.payload;
      })
      .addCase(rejectExpense.pending, (state) => {
        state.loadingAction = true;
        state.errorAction = null;
      })
      .addCase(rejectExpense.fulfilled, (state, action) => {
        state.loadingAction = false;
        const { expenseId, rejectedExpense } = action.payload;

        state.pendingExpenses = state.pendingExpenses.filter(
          (exp) => exp.id !== expenseId
        );

        state.rejectedExpenses.unshift(rejectedExpense);

        const index = state.allExpenses.findIndex(
          (exp) => exp.id === expenseId
        );
        if (index !== -1) {
          state.allExpenses[index] = rejectedExpense;
        }
      })
      .addCase(rejectExpense.rejected, (state, action) => {
        state.loadingAction = false;
        state.errorAction = action.payload;
      });
  },
});

export const { clearAllErrors, clearAllExpenses, updateExpenseStatus } =
  approvalSlice.actions;
export default approvalSlice.reducer;
