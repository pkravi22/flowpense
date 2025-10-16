import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { companyServices } from "@/services/companyServices";

// Fetch company info (only if needed)
export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await companyServices.getCompanyInfo({ id, token });
      return response.company;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchWalletLedger = createAsyncThunk(
  "company/fetchWalletLedger",
  async (token, thunkAPI) => {
    try {
      const response = await companyServices.getWalletLedger({
        companyId,
        token,
      });
      return response.company;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch company"
      );
    }
  }
);


const initialState = {
  company: null,
  isLoading: false,
  isError: false,
  message: "",
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    clearCompany: (state) => {
      state.company = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.company = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { setCompany, clearCompany } = companySlice.actions;
export default companySlice.reducer;
