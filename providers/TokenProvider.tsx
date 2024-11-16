import { useComments, UseCommentsReturn } from "@/hooks/useComments";
import { TokenInfo } from "@/types/token";
import { createContext, useContext, ReactNode } from "react";

export interface TokenContextType {
  token: TokenInfo;
  comments: UseCommentsReturn;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({
  children,
  token,
}: {
  children: ReactNode;
  token: TokenInfo;
}) {
  const comments = useComments(BigInt(token.token.tokenId));

  return (
    <TokenContext.Provider
      value={{
        token,
        comments,
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
