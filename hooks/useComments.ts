/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Address } from "viem";
import { MintCommentEvent } from "@/types/token";
import delay from "@/lib/delay";

async function fetchMintEvents(
  endPoint: string,
  tokenContract: Address,
  tokenId: string,
): Promise<MintCommentEvent[]> {
  while (true) {
    try {
      const response = await fetch(
        `${endPoint}?tokenContract=${tokenContract}&tokenId=${tokenId}`,
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
        fetchMintEvents(
          "/api/dune/mint_comments/crossmint",
          tokenContract,
          tokenId,
        ),
        fetchMintEvents(
          "/api/dune/mint_comments/erc20_minter",
          tokenContract,
          tokenId,
        ),
        fetchMintEvents(
          "/api/dune/mint_comments/smart_wallet",
          tokenContract,
          tokenId,
        ),
        fetchMintEvents(
          "/api/dune/mint_comments/token_contract",
          tokenContract,
          tokenId,
        ),
        fetchMintEvents(
          "/api/dune/mint_comments/wrapper",
          tokenContract,
          tokenId,
        ),
      ]);

      const data = [
        erc20MinterComments,
        smartWalletComments,
        tokenContractMintComments,
        wrapperMintComments,
        crossmintComments,
      ]
        .flat()
        .sort(
          (a: MintCommentEvent, b: MintCommentEvent) =>
            a.timestamp - b.timestamp,
        )
        .filter(
          (e) =>
            e?.collection?.toLowerCase() === tokenContract.toLowerCase() ||
            e?.tokenContract?.toLowerCase() === tokenContract.toLowerCase(),
        );
      setComments(data);
      setIsLoading(false);
    };
    if (tokenContract && tokenId) init();
  }, [tokenContract, tokenId]);

  return {
    comments,
    visibleComments,
    showMoreComments,
    addComment,
    isLoading,
  };
}
