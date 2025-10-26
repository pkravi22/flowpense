import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/services/authServices";
import { jwtDecode } from "jwt-decode";

export const login = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const response = await authService.signin(payload);

      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.Token);
      }

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);


const getUserFromToken = (token) => {
  console.log("hello token", token);
  try {
    const ans = jwtDecode(token);
    console.log("Hello token bhai", ans);
    return ans;
  } catch (error) {
    return null;
  }
};

console.log("lets fetch localstorage");
const tokenFromStorage =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const refreshToken =
  typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
console.log("token", tokenFromStorage);
const initialState = {
  token: tokenFromStorage,
  refreshToken: refreshToken,
  user: tokenFromStorage ? getUserFromToken(tokenFromStorage) : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.Token;
        state.user = getUserFromToken(action.payload.Token) || null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
