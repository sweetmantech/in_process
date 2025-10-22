import {
  CommentsQueryParams,
  MintComment,
  MomentCommentsInput,
  MomentCommentsResult,
} from "@/types/moment";

async function fetchComments({
  moment,
  chainId,
  offset,
}: MomentCommentsInput): Promise<MintComment[]> {
  try {
    const params: CommentsQueryParams = {
      contractAddress: moment.contractAddress,
      tokenId: moment.tokenId,
      chainId,
      offset,
    };

    const queryString = new URLSearchParams({
      contractAddress: params.contractAddress,
      tokenId: params.tokenId,
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
