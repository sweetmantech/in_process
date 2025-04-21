import useAirdrop from "@/hooks/useAirdrop";
import { createContext, useMemo, useContext } from "react";

const AirdropContext = createContext<ReturnType<typeof useAirdrop>>(
  {} as ReturnType<typeof useAirdrop>,
);

const AirdropProvider = ({ children }: { children: React.ReactNode }) => {
  const airDrop = useAirdrop();

  const value = useMemo(
    () => ({
      ...airDrop,
    }),
    [airDrop],
  );

  return (
    <AirdropContext.Provider value={value}>{children}</AirdropContext.Provider>
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
