/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Address } from "viem";
import { MintCommentEvent } from "@/types/token";
import delay from "@/lib/delay";

async function fetchMintEvents(
  endPoint: string,
  tokenContract: Address,
  tokenId: string,
  chainId: number
): Promise<MintCommentEvent[]> {
  while (true) {
    try {
      const response = await fetch(
        `${endPoint}?tokenContract=${tokenContract}&tokenId=${tokenId}&chainId=${chainId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch mint events.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      await delay(500);
    }
  }
}

export type UseCommentsReturn = {
  comments: MintCommentEvent[];
  visibleComments: number;
  showMoreComments: () => void;
  addComment: (comment: MintCommentEvent) => void;
  isLoading: boolean;
};

export function useComments(
  tokenContract: Address,
  tokenId: string,
  chainId: number
): UseCommentsReturn {
  const [visibleComments, setVisibleComments] = useState(3);
  const [comments, setComments] = useState<MintCommentEvent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const showMoreComments = () => {
    setVisibleComments((prev) => prev + 3);
  };

  const addComment = (comment: MintCommentEvent) => {
    setComments([comment, ...comments]);
  };

  useEffect(() => {
    const init = async () => {
      const [
        crossmintComments,
        erc20MinterComments,
        smartWalletComments,
        tokenContractMintComments,
        wrapperMintComments,
      ] = await Promise.all([
        fetchMintEvents("/api/dune/mint_comments/crossmint", tokenContract, tokenId, chainId),
        fetchMintEvents("/api/dune/mint_comments/erc20_minter", tokenContract, tokenId, chainId),
        fetchMintEvents("/api/dune/mint_comments/smart_wallet", tokenContract, tokenId, chainId),
        fetchMintEvents("/api/dune/mint_comments/token_contract", tokenContract, tokenId, chainId),
        fetchMintEvents("/api/dune/mint_comments/wrapper", tokenContract, tokenId, chainId),
      ]);

      const data = [
        erc20MinterComments,
        smartWalletComments,
        tokenContractMintComments,
        wrapperMintComments,
        crossmintComments,
      ]
        .flat()
        .sort((a: MintCommentEvent, b: MintCommentEvent) => b.timestamp - a.timestamp)
        .filter(
          (e) =>
            e?.collection?.toLowerCase() === tokenContract.toLowerCase() ||
            e?.tokenContract?.toLowerCase() === tokenContract.toLowerCase()
        );
      setComments(data);
      setIsLoading(false);
    };
    if (tokenContract && tokenId && chainId) init();
  }, [tokenContract, tokenId, chainId]);

  return {
    comments,
    visibleComments,
    showMoreComments,
    addComment,
    isLoading,
  };
}
