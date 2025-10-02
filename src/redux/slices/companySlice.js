import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { companyServices } from "@/services/companyServices";

// Fetch company info (only if needed)
export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async (token, thunkAPI) => {
    try {
      const response = await companyServices.getCompanyInfo({ token });
      return response.company; // backend returns {success, company}
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
