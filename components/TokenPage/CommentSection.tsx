import { useMomentProvider } from "@/providers/MomentProvider";
import CommentsContainer from "./CommentsContainer";
import { Skeleton } from "../ui/skeleton";
import { Comment } from "./Comment";
import FetchMore from "../FetchMore";
import { useMomentCommentsProvider } from "@/providers/MomentCommentsProvider";

const CommentSection = () => {
  const { comments, hasMore, isLoading, fetchMore } = useMomentCommentsProvider();
  const { isSetSale } = useMomentProvider();

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
        {comments.map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
      {hasMore && <FetchMore fetchMore={() => fetchMore()} />}
    </CommentsContainer>
  );
};

export default CommentSection;
