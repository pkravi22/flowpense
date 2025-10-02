import { createContext } from "react";

const TeamContext = createContext();

const TeamContextProvider = ({ children }) => {
  return <TeamContext.Provider>{children}</TeamContext.Provider>;
};
