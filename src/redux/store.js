import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cardReducer from "./slices/cardSlice";
import expenseReducer from "./slices/expenseSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cards: cardReducer,
    expenses: expenseReducer,
  },
});

export default store;
