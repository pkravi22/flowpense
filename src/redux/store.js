import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cardReducer from "./slices/cardSlice";
import expenseReducer from "./slices/expenseSlice";
import approvalReducer from "./slices/approvalSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardReducer,
    expenses: expenseReducer,
    approvals: approvalReducer,
  },
});

export default store;
