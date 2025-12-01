import { Address } from "viem";
import type { Database } from "@/lib/supabase/types";

export interface Moment {
  contractAddress: Address;
  tokenId: string;
  chainId: number;
}

export interface MomentCommentsInput {
  moment: Moment;
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
  id: string;
  username: string;
  sender: string;
  comment: string;
  timestamp: number;
}

export interface GetInProcessMomentsRpcParams {
  artist?: string;
  limit?: number;
  page?: number;
  latest?: boolean;
  chainId?: number;
  hidden?: Database["public"]["Tables"]["in_process_tokens"]["Row"]["hidden"];
  type?: "mutual" | "artist" | "timeline";
}

export interface GetInProcessMomentsRpcResponse {
  moments: any[];
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
  };
}

export type SaleConfig = {
  saleStart: bigint;
  saleEnd: bigint;
  maxTokensPerAddress: bigint;
  pricePerToken: bigint;
  fundsRecipient: Address;
  type: string;
};
