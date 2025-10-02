import { createContext } from "react";

const CardContext = createContext();

const CardContextProvider = ({ children }) => {
  return <CardContext.Provider>{children}</CardContext.Provider>;
};
