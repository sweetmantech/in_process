import { Address } from "viem";
import type { Database } from "@/lib/supabase/types";

export interface Moment {
  collectionAddress: Address;
  tokenId: string;
  chainId: number;
}

export interface MomentCommentsInput {
  moment: Moment;
  offset: number;
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

export interface MomentMetadata {
  image: string;
  name: string;
  description: string;
  external_url?: string;
  content: {
    mime: string;
    uri: string;
  };
  animation_url?: string;
}

export enum MomentType {
  Erc20Mint = "erc20Mint",
  TimedMint = "timed",
  FixedPriceMint = "fixedPrice",
}

export interface TimelineMoment {
  address: string;
  token_id: string;
  max_supply: number;
  chain_id: number;
  id: string;
  uri: string;
  default_admin: {
    address: string;
    username: string | null;
    hidden: boolean;
  };
  admins: Array<{
    address: string;
    username: string | null;
    hidden: boolean;
  }>;
  created_at: string;
  updated_at: string;
}
