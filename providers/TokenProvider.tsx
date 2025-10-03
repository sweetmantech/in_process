import { useComments } from "@/hooks/useComments";
import { useMetadata } from "@/hooks/useMetadata";
import useTokenInfo from "@/hooks/useTokenInfo";
import useWriteComment from "@/hooks/useWriteComment";
import { TokenInfo } from "@/types/token";
import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TokenContext = createContext<
  | (ReturnType<typeof useWriteComment> &
      ReturnType<typeof useTokenInfo> &
      ReturnType<typeof useComments> & {
        token: TokenInfo;
        isOpenCommentModal: boolean;
        setIsOpenCommentModal: Dispatch<SetStateAction<boolean>>;
        metadata: ReturnType<typeof useMetadata>;
        collected: boolean;
        setCollected: Dispatch<SetStateAction<boolean>>;
        mintCount: number;
        setMintCount: Dispatch<SetStateAction<number>>;
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
  const writeComment = useWriteComment();
  const comments = useComments(token.tokenContractAddress, token.tokenId, chainId);
  const tokenInfo = useTokenInfo(token.tokenContractAddress, token.tokenId, chainId);
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);
  const metadata = useMetadata(tokenInfo.tokenUri);
  const [collected, setCollected] = useState(false);
  const [mintCount, setMintCount] = useState(1);

  return (
    <TokenContext.Provider
      value={{
        token,
        ...comments,
        ...writeComment,
        ...tokenInfo,
        isOpenCommentModal,
        setIsOpenCommentModal,
        metadata,
        collected,
        setCollected,
        mintCount,
        setMintCount,
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
