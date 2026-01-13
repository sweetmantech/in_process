import useAirdrop from "@/hooks/useAirdrop";
import { createContext, useMemo, useContext } from "react";
import AirdropRecipientsProvider from "./AirdropRecipientsProvider";

interface AirdropContextValue extends ReturnType<typeof useAirdrop> {}

const AirdropContext = createContext<AirdropContextValue>({} as AirdropContextValue);

const AirdropProvider = ({ children }: { children: React.ReactNode }) => {
  const airDrop = useAirdrop();

  const value = useMemo(
    () => ({
      ...airDrop,
    }),
    [airDrop]
  );

  return (
    <AirdropRecipientsProvider>
      <AirdropContext.Provider value={value}>{children}</AirdropContext.Provider>
    </AirdropRecipientsProvider>
  );
};

export const useAirdropProvider = () => {
  const context = useContext(AirdropContext);
  if (!context) {
    throw new Error("useAirdropProvider must be used within a AirdropProvider");
  }
  return context;
};

export default AirdropProvider;
