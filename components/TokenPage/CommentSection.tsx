import { useTokenProvider } from "@/providers/TokenProvider";
import CommentsContainer from "./CommentsContainer";
import { Skeleton } from "../ui/skeleton";
import { Comment } from "./Comment";

const CommentSection = () => {
  const { visibleComments, comments, showMoreComments, isLoading, isSetSale } =
    useTokenProvider();

  if (isLoading)
    return (
      <CommentsContainer>
        <Skeleton className="w-full h-[300px]" />
      </CommentsContainer>
    );
  if (comments.length === 0)
    return (
      <CommentsContainer>
        <p className="font-archivo">no comments yet</p>
        <p className="font-spectral-italic tracking-[-1px]">
          {isSetSale ? "collect and be first" : "sale is not yet activated."}
        </p>
      </CommentsContainer>
    );

  return (
    <CommentsContainer>
      <div className="space-y-1 md:space-y-2">
        {comments.map((comment, i) => (
          <Comment
            key={i}
            comment={comment.comment}
            sender={comment.sender}
            timestamp={comment.timestamp}
          />
        ))}
      </div>
      {comments.length > visibleComments && (
        <button
          onClick={showMoreComments}
          className="w-full py-2 mt-4 text-sm bg-black text-grey-eggshell font-archivo"
        >
          View More Comments
        </button>
      )}
    </CommentsContainer>
  );
};

export default CommentSection;
