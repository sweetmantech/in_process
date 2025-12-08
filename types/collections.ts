import { TokenMetadataJson } from "@/lib/protocolSdk/ipfs/types";

export interface CollectionsResponse {
  status: "success" | "error";
  collections: Array<{
    id: number;
    address: string;
    chain_id: number;
    uri: string;
    name: string;
    created_at: string;
    default_admin: {
      username: string | null;
      address: string;
    };
  }>;
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
  };
  message?: string;
}

export type CollectionItem = CollectionsResponse["collections"][number];

export interface CollectionResponse {
  id: number;
  address: string;
  chain_id: number;
  name: string;
  uri: string;
  metadata: TokenMetadataJson;
  default_admin: {
    address: string;
    username: string | null;
  };
  payout_recipient: string;
  created_at: string;
  updated_at: string;
}

export interface FetchCollectionParams {
  collectionAddress: string;
  chainId?: string;
}
