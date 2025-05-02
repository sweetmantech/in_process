import { useTokenProvider } from "@/providers/TokenProvider";
import CommentsContainer from "./CommentsContainer";
import ArtistName from "../ArtistName";

const CommentSection = () => {
  const { visibleComments, comments, showMoreComments } = useTokenProvider();

  const sortedComments = [...comments].sort(
    (a, b) => b.timestamp - a.timestamp,
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
      <div className="space-y-1 md:space-y-2">
        {sortedComments.slice(0, visibleComments).map((comment, i) => (
          <div key={i} className="rounded flex items-end justify-between">
            <div>
              <p className="text-base font-spectral tracking-[-1px]">
                {comment.comment}
              </p>
              <ArtistName
                address={comment.sender}
                className="text-base font-archivo-medium"
              />
            </div>
            <p className="text-sm font-archivo lowercase">
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
