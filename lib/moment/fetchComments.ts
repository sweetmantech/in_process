import { MintComment, MomentCommentsInput, MomentCommentsResult } from "@/types/moment";

async function fetchComments({
  moment,
  chainId,
  offset,
}: MomentCommentsInput): Promise<MintComment[]> {
  try {
    const response = await fetch(`/api/moment/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        moment,
        chainId,
        offset,
      }),
    });
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
