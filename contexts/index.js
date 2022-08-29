import { createContext } from 'react';
const AppContext = createContext({
  themeType: 'dark',
  themeChange: () => {},
  isWalletModalOpened: false,
  setIsWalletModalOpened: () => {},
  balanceData: {},
  setBalanceData: {},
  isMinter: false,
  setIsMinter: () => {},
  isOwner: false,
  setIsOwner: () => {},
});

export { AppContext };
