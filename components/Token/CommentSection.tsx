import { formatTimeAgo } from "@/lib/formatTimeAgo";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useCollectionProvider } from "@/providers/CollectionProvider";

const CommentSection = () => {
  const { visibleComments, comments, loading, error, showMoreComments } =
    useTokenProvider();
  const { styling } = useCollectionProvider();

  console.log("styling", styling);
  const sortedComments = [...comments].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold mb-2">Comments:</h4>
      {loading ? (
        <p>Loading comments...</p>
      ) : error ? (
        <p className="text-red-500">Error loading comments</p>
      ) : comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <div className="space-y-2">
          {sortedComments.slice(0, visibleComments).map((comment) => (
            <div
              key={comment.transactionHash}
              className="p-2 rounded"
              style={{
                backgroundColor: styling?.theme?.color?.background || "#f3f4f6",
                border: `1px solid ${styling?.theme?.color?.text}33`,
              }}
            >
              <p
                className={`text-sm`}
                style={{ color: styling?.theme?.color?.text }}
              >
                {comment.comment}
              </p>
              <div className="flex justify-between items-center mt-1">
                <p
                  className="text-xs"
                  style={{ color: `${styling?.theme?.color?.accentText}` }}
                >
                  By: {comment.sender.slice(0, 6)}...{comment.sender.slice(-4)}
                </p>
                <p
                  className="text-xs"
                  style={{ color: `${styling?.theme?.color?.text}99` }}
                >
                  {formatTimeAgo(comment.timestamp)}
                </p>
              </div>
            </div>
          ))}
          {sortedComments.length > visibleComments && (
            <button
              onClick={showMoreComments}
              className="w-full py-2 mt-2 text-sm"
              style={{
                color: styling?.theme?.color?.accentText,
              }}
            >
              View More Comments
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
