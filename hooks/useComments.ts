/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { MintCommentEvent } from "@/lib/viem/getContractEvents";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { fetchTokenData } from "@/lib/zora/getComments";

export type UseCommentsReturn = {
  comments: MintCommentEvent[];
  loading: boolean;
  error: Error | null;
  visibleComments: number;
  showMoreComments: () => void;
};

export function useComments(tokenId: bigint): UseCommentsReturn {
  const [comments, setComments] = useState<MintCommentEvent[]>([]);
  const [visibleComments, setVisibleComments] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { address, chainId } = useCollectionProvider();

  const showMoreComments = () => {
    setVisibleComments((prev) => prev + 3);
  };

  useEffect(() => {
    async function fetchComments() {
      try {
        setLoading(true);
        const API_ENDPOINT = "https://api.zora.co/graphql/";
        const IPFS_GATEWAY = "https://magic.decentralized-content.com/ipfs/";

        const network = chainId === 8453 ? "BASE" : "ZORA";
        const networkType = chainId === 8453 ? "BASE_MAINNET" : "ZORA_MAINNET";

        const result = await fetchTokenData(
          API_ENDPOINT,
          IPFS_GATEWAY,
          address,
          network,
          networkType,
          10,
          null,
        );

        const token = result.tokens.find(
          (t: any) => BigInt(t.tokenId) === tokenId,
        );

        const mappedComments =
          token?.comments.map((comment: any) => ({
            sender: comment.fromAddress,
            comment: comment.comment,
            blockNumber: comment.blockNumber,
            timestamp: new Date(comment.blockTimestamp),
            transactionHash: comment.transactionHash,
          })) || [];

        setComments(mappedComments);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch comments"),
        );
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [tokenId, address, chainId]);

  return {
    comments,
    loading,
    error,
    visibleComments,
    showMoreComments,
  };
}
