import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cardReducer from "./slices/cardSlice";
import expenseReducer from "./slices/expenseSlice";
import approvalReducer from "./slices/approvalSlice";
import companyReducer from "./slices/companySlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardReducer,
    expenses: expenseReducer,
    approvals: approvalReducer,
    company: companyReducer,
  },
});

export default store;
