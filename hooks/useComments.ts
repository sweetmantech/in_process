/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { MintComment } from "@/types/moment";
import fetchComments from "@/lib/moment/fetchComments";
import { useTokenProvider } from "@/providers/TokenProvider";

export type UseCommentsReturn = {
  comments: MintComment[];
  addComment: (comment: MintComment) => void;
  isLoading: boolean;
  hasMore: boolean;
  fetchMore: (offset: number) => void;
};

export function useComments(): UseCommentsReturn {
  const { token } = useTokenProvider();
  const [comments, setComments] = useState<MintComment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { tokenContractAddress: contractAddress, tokenId, chainId } = token;

  const addComment = (comment: MintComment) => {
    setComments([comment, ...comments]);
  };

  const fetchMore = useCallback(
    async (offset: number) => {
      if (!contractAddress || !tokenId || !chainId) return;
      setIsLoading(true);
      const newComments = await fetchComments({
        moment: {
          contractAddress,
          tokenId,
        },
        chainId,
        offset,
      });
      if (newComments.length === 0) {
        setHasMore(false);
        setIsLoading(false);
        return;
      }
      setHasMore(true);
      setIsLoading(false);
      setComments((prevComments) => [...prevComments, ...newComments]);
    },
    [contractAddress, tokenId, chainId]
  );

  useEffect(() => {
    fetchMore(0);
  }, [fetchMore]);

  return {
    comments,
    addComment,
    isLoading,
    hasMore,
    fetchMore,
  };
}
