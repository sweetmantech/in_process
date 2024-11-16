import { useEffect, useState } from "react";
import {
  getMintCommentEvents,
  MintCommentEvent,
} from "@/lib/viem/getContractEvents";

export function useComments(tokenId: bigint) {
  const [comments, setComments] = useState<MintCommentEvent[]>([]);
  const [visibleComments, setVisibleComments] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const showMoreComments = () => {
    setVisibleComments((prev) => prev + 3);
  };

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const fetchedComments = await getMintCommentEvents(tokenId);
        setComments(fetchedComments);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch comments")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [tokenId]);

  return {
    comments,
    loading,
    error,
    visibleComments,
    showMoreComments,
  };
}
