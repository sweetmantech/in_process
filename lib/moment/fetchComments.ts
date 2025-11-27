import { MintComment, MomentCommentsInput, MomentCommentsResult } from "@/types/moment";

async function fetchComments({ moment, offset }: MomentCommentsInput): Promise<MintComment[]> {
  try {
    const queryString = new URLSearchParams({
      collectionAddress: moment.collectionAddress.toString(),
      tokenId: moment.tokenId,
      chainId: moment.chainId.toString(),
      offset: offset.toString(),
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
