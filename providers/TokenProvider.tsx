import { useComments } from "@/hooks/useComments";
import { useMetadata } from "@/hooks/useMetadata";
import useTokenSaleConfig from "@/hooks/useTokenSaleConfig";
import useWriteComment from "@/hooks/useWriteComment";
import { TokenInfo } from "@/types/token";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TokenContext = createContext<
  | (ReturnType<typeof useWriteComment> &
      ReturnType<typeof useComments> & {
        token: TokenInfo;
        isOpenCommentModal: boolean;
        setIsOpenCommentModal: Dispatch<SetStateAction<boolean>>;
        saleConfig: ReturnType<typeof useTokenSaleConfig>;
        metadata: ReturnType<typeof useMetadata>;
      })
  | undefined
>(undefined);

export function TokenProvider({
  children,
  token,
  tokenId,
}: {
  children: ReactNode;
  token: TokenInfo;
  tokenId: string;
}) {
  const writeComment = useWriteComment();
  const comments = useComments(token.token.contract.address, tokenId);
  const saleConfig = useTokenSaleConfig(token.token.contract.address, tokenId);
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);
  const metadata = useMetadata(token.token.tokenURI);

  return (
    <TokenContext.Provider
      value={{
        token,
        ...comments,
        ...writeComment,
        saleConfig,
        isOpenCommentModal,
        setIsOpenCommentModal,
        metadata,
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
