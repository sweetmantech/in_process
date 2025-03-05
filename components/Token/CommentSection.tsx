import { useTokenProvider } from "@/providers/TokenProvider";
import CommentsContainer from "./CommentsContainer";
import { Skeleton } from "../ui/skeleton";

const CommentSection = () => {
  const { visibleComments, comments, loading, error, showMoreComments } =
    useTokenProvider();

  const sortedComments = [...comments].sort(
    (a, b) => b.timestamp - a.timestamp,
  );

  if (loading)
    return (
      <CommentsContainer>
        <Skeleton className="w-full h-[300px]" />
      </CommentsContainer>
    );
  if (error)
    return (
      <CommentsContainer>
        <p className="font-archivo text-xl text-red">Error loading comments</p>
      </CommentsContainer>
    );
  if (comments.length === 0)
    return (
      <CommentsContainer>
        <p className="font-archivo">no comments yet</p>
        <p className="font-spectral-italic tracking-[-1px]">
          collect and be first
        </p>
      </CommentsContainer>
    );

  return (
    <CommentsContainer>
      <div className="space-y-2">
        {sortedComments.slice(0, visibleComments).map((comment, i) => (
          <div key={i} className="rounded flex items-end justify-between">
            <div>
              <p className="text-lg font-spectral tracking-[-1px]">
                {comment.comment}
              </p>
              <p className="text-md font-archivo">
                {comment.sender.slice(0, 6)}...{comment.sender.slice(-4)}
              </p>
            </div>
            <p className="text-sm font-archivo">
              {new Date(comment.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      {sortedComments.length > visibleComments && (
        <button
          onClick={showMoreComments}
          className="w-full py-2 mt-4 text-sm bg-black text-tan-primary font-archivo"
        >
          View More Comments
        </button>
      )}
    </CommentsContainer>
  );
};

export default CommentSection;
