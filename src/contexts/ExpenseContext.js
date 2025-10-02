import { createContext } from "react";

const ExpenseContext = createContext();

const ExpenseContextProvider = ({ children }) => {
  return <ExpenseContext.Provider>{children}</ExpenseContext.Provider>;
};
