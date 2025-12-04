import { Address, Hash } from "viem";
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

export interface TimelinePagination {
  page: number;
  limit: number;
  total_pages: number;
}

export interface GetInProcessTimelineParams {
  limit?: number;
  page?: number;
  chainId?: number;
  hidden?: boolean;
}

export interface GetInProcessTimelineResponse {
  moments: TimelineMoment[];
  pagination: TimelinePagination;
}

export interface GetArtistTimelineParams {
  artist: string;
  type?: "mutual" | "default" | null;
  limit?: number;
  page?: number;
  chainId?: number;
  hidden?: boolean;
}

export interface GetArtistTimelineResponse {
  moments: TimelineMoment[];
  pagination: TimelinePagination;
}

export type MomentSaleConfig = {
  pricePerToken: string;
  saleStart: number;
  saleEnd: number;
  maxTokensPerAddress: number;
  fundsRecipient: Address;
  type: MomentType;
};

export type MomentResponse = {
  uri: string | null;
  owner: string | null;
  saleConfig: MomentSaleConfig | null;
  momentAdmins: string[];
  metadata: MomentMetadata;
};

export type MomentAdvancedInfo = {
  uri: string | null;
  owner: string | null;
  saleConfig: MomentSaleConfig | null;
};

export interface UpdateMomentURIInput {
  moment: Moment;
  newUri: string;
  artistAddress: Address;
}

export interface UpdateMomentURIResult {
  hash: Hash;
  chainId: number;
}
