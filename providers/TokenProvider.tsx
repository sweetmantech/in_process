import { useComments } from "@/hooks/useComments";
import useWriteComment from "@/hooks/useWriteComment";
import { TokenInfo } from "@/types/token";
import { createContext, useContext, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TokenContext = createContext<any | undefined>(undefined);

export function TokenProvider({
  children,
  token,
}: {
  children: ReactNode;
  token: TokenInfo;
}) {
  const writeComment = useWriteComment(BigInt(token.token.tokenId));
  const comments = useComments(BigInt(token.token.tokenId));

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
