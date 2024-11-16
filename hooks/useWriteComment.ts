import { useState } from "react";

const useWriteComment = () => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return { comment, setComment, handleCommentChange };
};

export default useWriteComment;
