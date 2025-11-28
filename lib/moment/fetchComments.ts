import {
  CommentsQueryParams,
  MintComment,
  MomentCommentsInput,
  MomentCommentsResult,
} from "@/types/moment";
import { base } from "viem/chains";

async function fetchComments({ moment, offset }: MomentCommentsInput): Promise<MintComment[]> {
  try {
    const params: CommentsQueryParams = {
      contractAddress: moment.collectionAddress,
      tokenId: moment.tokenId,
      chainId: moment.chainId ?? base.id, // Default to Base mainnet
      offset,
    };

    const queryString = new URLSearchParams({
      collectionAddress: moment.collectionAddress,
      tokenId: moment.tokenId,
      chainId: params.chainId.toString(),
      offset: params.offset?.toString() || "0",
    });

    const response = await fetch(`/api/moment/comments?${queryString}`);

    if (!response.ok) {
      throw new Error("Failed to fetch comments.");
    }
    const data: MomentCommentsResult = await response.json();
    return data.comments;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default fetchComments;
