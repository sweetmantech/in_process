import { z } from "zod";
import { commentsSchema } from "../schema/commentsSchema";
import selectMoment from "../supabase/in_process_moments/selectMoment";
import { Address } from "viem";
import selectComments from "../supabase/in_process_moment_comments/selectComments";
import { MomentCommentsResult } from "@/types/moment";

export type GetCommentsInput = z.infer<typeof commentsSchema>;

export async function momentComments({
  moment,
  offset,
}: GetCommentsInput): Promise<MomentCommentsResult> {
  const momentdata = await selectMoment({
    collectionAddress: moment.collectionAddress as Address,
    tokenId: moment.tokenId,
    chainId: moment.chainId,
  });

  if (!momentdata) {
    throw new Error("Moment not found");
  }

  const comments = await selectComments({
    momentId: momentdata.id,
    offset,
  });

  const formattedComments = comments.map((comment) => ({
    id: comment.id,
    comment: comment.comment ?? "",
    sender: comment.artist.address,
    username: comment.artist.username ?? "",
    timestamp: comment.commented_at ? new Date(comment.commented_at).getTime() : 0,
  }));

  return {
    comments: formattedComments,
  };
}
