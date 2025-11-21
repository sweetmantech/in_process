import { useState } from "react";

export interface UseWriteCommentReturn {
  comment: string;
  setComment: (value: string) => void;
  setIsOpenCommentModal: (value: boolean) => void;
  isOpenCommentModal: boolean;
}

const useWriteComment = (): UseWriteCommentReturn => {
  const [comment, setComment] = useState("");
  const [isOpenCommentModal, setIsOpenCommentModal] = useState<boolean>(false);

  return { comment, setComment, setIsOpenCommentModal, isOpenCommentModal };
};

export default useWriteComment;
