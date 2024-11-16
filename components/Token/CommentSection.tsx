import { useComments } from "@/hooks/useComments";
import { formatTimeAgo } from "@/lib/formatTimeAgo";

const CommentSection = ({ tokenId }: { tokenId: bigint }) => {
  const { comments, loading, error } = useComments(tokenId);

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
        <p className="text-gray-500">No comments yet</p>
      ) : (
        <div className="space-y-2">
          {sortedComments.map((comment) => (
            <div
              key={comment.transactionHash}
              className="p-2 bg-gray-100 rounded"
            >
              <p className="text-sm text-black">{comment.comment}</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">
                  By: {comment.sender.slice(0, 6)}...{comment.sender.slice(-4)}
                </p>
                <p className="text-xs text-gray-500">
                  {formatTimeAgo(comment.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
