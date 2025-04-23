/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Address } from "viem";
import { MintCommentEvent } from "@/types/token";
import { useQuery } from "@tanstack/react-query";

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
    if (!events) return;

    const filtered = events
      .sort(
        (a: MintCommentEvent, b: MintCommentEvent) => a.timestamp - b.timestamp,
      )
      .filter(
        (e) =>
          e?.collection?.toLowerCase() === tokenContract.toLowerCase() ||
          e?.tokenContract?.toLowerCase() === tokenContract.toLowerCase(),
      );
    setComments(filtered);
  }, [events]);

  return {
    comments,
    loading: isLoading,
    error,
    visibleComments,
    showMoreComments,
    addComment,
  };
}
