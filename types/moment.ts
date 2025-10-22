import { Address } from "viem";

export interface Moment {
  contractAddress: Address;
  tokenId: string;
}

export interface MomentCommentsInput {
  moment: Moment;
  chainId: number;
  offset: number;
}

export interface CommentsQueryParams {
  contractAddress: string;
  tokenId: string;
  chainId: number;
  offset?: number;
}

export interface MomentCommentsResult {
  comments: MintComment[];
}

export interface MintComment {
  sender: string;
  comment: string;
  timestamp: number;
}
