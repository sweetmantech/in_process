import { useComments } from "@/hooks/useComments";
import useWriteComment from "@/hooks/useWriteComment";
import { TokenInfo } from "@/types/token";
import { createContext, useContext, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TokenContext = createContext<any | undefined>(undefined);

export function TokenProvider({
  children,
  token,
  tokenId,
}: {
  children: ReactNode;
  token: TokenInfo;
  tokenId: bigint;
}) {
  console.log("SWEETS PROVIDER HAS token.token.tokenId?", tokenId);
  const writeComment = useWriteComment(tokenId);
  const comments = useComments(tokenId);

  return (
    <TokenContext.Provider
      value={{
        token,
        ...comments,
        ...writeComment,
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
