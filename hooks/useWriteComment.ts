import { useState } from "react";

export interface UseWriteCommentReturn {
  comment: string;
  setComment: (value: string) => void;
}

const useWriteComment = (): UseWriteCommentReturn => {
  const [comment, setComment] = useState("");

  return { comment, setComment };
};

export default useWriteComment;
