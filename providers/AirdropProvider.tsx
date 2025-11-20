import useAirdrop from "@/hooks/useAirdrop";
import { createContext, useMemo, useContext } from "react";
import { Address } from "viem";

const AirdropContext = createContext<ReturnType<typeof useAirdrop>>(
  {} as ReturnType<typeof useAirdrop>
);

const AirdropProvider = ({
  children,
  momentContract,
  tokenId,
}: {
  children: React.ReactNode;
  momentContract: Address;
  tokenId: string;
}) => {
  const airDrop = useAirdrop(momentContract, tokenId);

  const value = useMemo(
    () => ({
      ...airDrop,
    }),
    [airDrop]
  );

  return <AirdropContext.Provider value={value}>{children}</AirdropContext.Provider>;
};

export const useAirdropProvider = () => {
  const context = useContext(AirdropContext);
  if (!context) {
    throw new Error("useAirdropProvider must be used within a AirdropProvider");
  }
  return context;
};

export default AirdropProvider;
