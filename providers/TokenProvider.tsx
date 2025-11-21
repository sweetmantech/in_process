import useTokenInfo from "@/hooks/useTokenInfo";
import { TokenInfo } from "@/types/token";
import { createContext, useContext, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TokenContext = createContext<
  | (ReturnType<typeof useTokenInfo> & {
      token: TokenInfo;
    })
  | undefined
>(undefined);

export function TokenProvider({
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
    <TokenContext.Provider
      value={{
        token,
        ...tokenInfo,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
}

export function useTokenProvider() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useTokenProvider must be used within a TokenProvider");
  }
  return context;
}
