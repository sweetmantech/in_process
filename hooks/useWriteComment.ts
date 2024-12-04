import { useState } from "react";

export interface UseWriteCommentReturn {
  comment: string;
  setComment: (value: string) => void;
  handleCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useWriteComment = (tokenId: bigint): UseWriteCommentReturn => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return { comment, setComment, handleCommentChange };
};

export default useWriteComment;
