import { z } from "zod";
import { commentsSchema } from "../schema/commentsSchema";
import fetchGraphQL from "../envio/fetchGraphQL";
import { INDEXER_ID } from "../consts";

export type GetCommentsInput = z.infer<typeof commentsSchema>;

export interface CommentsResult {
  comments: {
    comment: string;
    sender: string;
    timestamp: number;
  };
}

export async function momentComments({
  moment,
  chainId,
  offset,
}: GetCommentsInput): Promise<CommentsResult> {
  const operation = `
    query inprocess_mint_indexer {
      ERC20Minter_MintComment(
        limit: 10
        offset: ${offset}
        where: {tokenContract: {_eq: "${moment.contractAddress.toLowerCase()}"}, tokenId: {_eq: "${moment.tokenId}"}, chainId: {_eq: ${chainId}}}
        order_by: {timestamp: desc}
      ) {
        comment
        sender
        timestamp
      }
    }
  `;

  const data = await fetchGraphQL(INDEXER_ID, operation, "inprocess_mint_indexer", {});

  return {
    comments: data.data.ERC20Minter_MintComment,
  };
}
