import useTokenInfo from "@/hooks/useTokenInfo";
import { TokenInfo } from "@/types/token";
import { createContext, useContext, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MomentContext = createContext<
  | (ReturnType<typeof useTokenInfo> & {
      token: TokenInfo;
    })
  | undefined
>(undefined);

export function MomentProvider({
  children,
  token,
  chainId,
}: {
  children: ReactNode;
  token: TokenInfo;
  chainId: number;
}) {
  const tokenInfo = useTokenInfo(token.tokenContractAddress, token.tokenId, chainId);

  return (
    <MomentContext.Provider
      value={{
        token,
        ...tokenInfo,
      }}
    >
      {children}
    </MomentContext.Provider>
  );
}

export function useMomentProvider() {
  const context = useContext(MomentContext);
  if (context === undefined) {
    throw new Error("useMomentProvider must be used within a MomentProvider");
  }
  return context;
}
