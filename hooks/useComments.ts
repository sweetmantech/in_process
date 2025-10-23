/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import { MintComment } from "@/types/moment";
import fetchComments from "@/lib/moment/fetchComments";

export type UseCommentsReturn = {
  comments: MintComment[];
  addComment: (comment: MintComment) => void;
  isLoading: boolean;
  hasMore: boolean;
  fetchMore: (offset: number) => void;
};

export function useComments(
  contractAddress: Address,
  tokenId: string,
  chainId: number
): UseCommentsReturn {
  const [comments, setComments] = useState<MintComment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

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
