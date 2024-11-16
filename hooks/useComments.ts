import { useEffect, useState } from "react";
import {
  getMintCommentEvents,
  MintCommentEvent,
} from "@/lib/viem/getContractEvents";

export function useComments(tokenId: bigint) {
  const [comments, setComments] = useState<MintCommentEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
  };
}
