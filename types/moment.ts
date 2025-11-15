import { Address } from "viem";
import type { Database } from "@/lib/supabase/types";

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

export interface GetInProcessMomentsRpcParams {
  artist?: string;
  limit?: number;
  page?: number;
  latest?: boolean;
  chainId?: number;
  hidden?: Database["public"]["Tables"]["in_process_tokens"]["Row"]["hidden"];
  mutual?: boolean;
}

export interface GetInProcessMomentsRpcResponse {
  moments: any[];
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
  };
}
