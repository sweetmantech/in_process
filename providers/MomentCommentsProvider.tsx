import { useComments } from "@/hooks/useComments";
import useWriteComment from "@/hooks/useWriteComment";
import { TokenInfo } from "@/types/token";
import { createContext, useContext, ReactNode } from "react";

const MomentCommentsContext = createContext<
  (ReturnType<typeof useWriteComment> & ReturnType<typeof useComments>) | undefined
>(undefined);

export function MomentCommentsProvider({
  children,
}: {
  children: ReactNode;
  token: TokenInfo;
  chainId: number;
}) {
  const writeComment = useWriteComment();
  const comments = useComments();

  return (
    <MomentCommentsContext.Provider
      value={{
        ...comments,
        ...writeComment,
      }}
    >
      {children}
    </MomentCommentsContext.Provider>
  );
}

export function useMomentCommentsProvider() {
  const context = useContext(MomentCommentsContext);
  if (context === undefined) {
    throw new Error("useMomentCommentsProvider must be used within a MomentCommentsProvider");
  }
  return context;
}
