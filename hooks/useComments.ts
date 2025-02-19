/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Address } from "viem";
import { MintCommentEvent } from "@/types/token";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";

async function fetchMintEvents(
  tokenContract: Address,
  tokenId: string,
): Promise<MintCommentEvent[]> {
  const response = await fetch(
    `/api/dune/mint_comments?tokenContract=${tokenContract}&tokenId=${tokenId}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch mint events.");
  }
  const data = await response.json();
  return data;
}

export type UseCommentsReturn = {
  comments: MintCommentEvent[];
  loading: boolean;
  error: Error | null;
  visibleComments: number;
  showMoreComments: () => void;
  addComment: (comment: MintCommentEvent) => void;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<MintCommentEvent[], Error>>;
};

export function useComments(
  tokenContract: Address,
  tokenId: string,
): UseCommentsReturn {
  const [comments, setComments] = useState<MintCommentEvent[]>([]);
  const [visibleComments, setVisibleComments] = useState(3);
  const {
    isLoading,
    data: events,
    error,
    refetch,
  } = useQuery({
    queryKey: ["mintComments", tokenContract, tokenId],
    queryFn: () => fetchMintEvents(tokenContract, tokenId),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
  });

  const showMoreComments = () => {
    setVisibleComments((prev) => prev + 3);
  };

  const addComment = (comment: MintCommentEvent) => {
    setComments([comment, ...comments]);
  };

  useEffect(() => {
    if (events) setComments(events);
  }, [events]);

  return {
    comments,
    loading: isLoading,
    error,
    visibleComments,
    showMoreComments,
    addComment,
    refetch,
  };
}
