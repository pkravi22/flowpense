import { createContext } from "react";

const DashBoardContext = createContext();

const DashBoardContextProvider = ({ children }) => {
  return <DashBoardContext.Provider>{children}</DashBoardContext.Provider>;
};
