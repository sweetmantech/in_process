import { z } from "zod";
import { commentsSchema } from "../schema/commentsSchema";
import selectMoments from "../supabase/in_process_moments/selectMoments";
import { Address } from "viem";
import selectComments from "../supabase/in_process_moment_comments/selectComments";
import { MomentCommentsResult } from "@/types/moment";

export type GetCommentsInput = z.infer<typeof commentsSchema>;

export async function momentComments({
  moment,
  chainId,
  offset,
}: GetCommentsInput): Promise<MomentCommentsResult> {
  const data = await selectMoments({
    collectionAddress: moment.contractAddress as Address,
    tokenId: moment.tokenId,
    chainId,
  });

  const momentData = data[0];

  if (!momentData) {
    throw new Error("Moment not found");
  }

  const comments = await selectComments({
    momentId: momentData.id,
    offset,
  });

  const formattedComments = comments.map((comment) => ({
    comment: comment.comment ?? "",
    sender: comment.artist.address,
    username: comment.artist.username ?? "",
    timestamp: comment.commented_at ? new Date(comment.commented_at).getTime() : 0,
  }));

  return {
    comments: formattedComments,
  };
}
