import { createContext } from "react";

const WalletContext = createContext();

const WalletContextProvider = ({ children }) => {
  return <WalletContext.Provider value={}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  return useContext(WalletContext);
};