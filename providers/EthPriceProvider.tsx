import useEthPrice from "@/hooks/useEthPrice";
import { createContext, useMemo, useContext } from "react";

const EthPriceContext = createContext<ReturnType<typeof useEthPrice>>(
  {} as ReturnType<typeof useEthPrice>,
);

const EthPriceProvider = ({ children }: { children: React.ReactNode }) => {
  const ethPrice = useEthPrice();

  const value = useMemo(
    () => ({
      ...ethPrice,
    }),
    [ethPrice],
  );

  return (
    <EthPriceContext.Provider value={value}>
      {children}
    </EthPriceContext.Provider>
  );
};

export const useEthPriceProvider = () => {
  const context = useContext(EthPriceContext);
  if (!context) {
    throw new Error(
      "useEthPriceProvider must be used within a EthPriceProvider",
    );
  }
  return context;
};

export default EthPriceProvider;
