import { MintComment, MomentCommentsInput, MomentCommentsResult } from "@/types/moment";
import { IN_PROCESS_API } from "@/lib/consts";

async function fetchComments({ moment, offset }: MomentCommentsInput): Promise<MintComment[]> {
  try {
    const queryString = new URLSearchParams({
      collectionAddress: moment.collectionAddress,
      tokenId: moment.tokenId,
      chainId: moment.chainId.toString(),
      offset: offset?.toString() || "0",
    });

    const response = await fetch(`${IN_PROCESS_API}/moment/comments?${queryString}`);

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
