import { useComments } from "@/hooks/useComments";
import useWriteComment from "@/hooks/useWriteComment";
import { createContext, useContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

const MomentCommentsContext = createContext<
  | (ReturnType<typeof useWriteComment> &
      ReturnType<typeof useComments> & {
        isOpenCommentModal: boolean;
        setIsOpenCommentModal: Dispatch<SetStateAction<boolean>>;
      })
  | undefined
>(undefined);

export function MomentCommentsProvider({ children }: { children: ReactNode }) {
  const writeComment = useWriteComment();
  const comments = useComments();
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);

  return (
    <MomentCommentsContext.Provider
      value={{
        ...comments,
        ...writeComment,
        isOpenCommentModal: isOpenCommentModal,
        setIsOpenCommentModal: setIsOpenCommentModal,
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
