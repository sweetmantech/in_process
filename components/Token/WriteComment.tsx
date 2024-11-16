import { useTokenProvider } from "@/providers/TokenProvider";

const WriteComment = () => {
  const { comment, handleCommentChange } = useTokenProvider();

  return (
    <div className="comment-section">
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Write a comment..."
        className="w-full p-2 border rounded-md resize-none h-24 text-black"
        aria-label="Write a comment"
      />
    </div>
  );
};

export default WriteComment;
