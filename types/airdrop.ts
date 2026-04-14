import type { MomentMetadata, Protocol } from "@/types/moment";

export interface AirdropItem {
  address: string;
  status: "validating" | "invalid" | "valid";
  ensName: string;
}

export interface AirdropTransfer {
  id?: string;
  transferred_at: string;
  quantity: string;
  value: string | null;
  currency: string | null;
  transaction_hash?: string;
  collector: {
    address: string;
    username: string | null;
  };
  moment: {
    token_id: string;
    collection: {
      address: string;
      chain_id: number;
      protocol: Protocol;
      artist?: {
        address: string;
        username: string | null;
      };
    };
    metadata?: MomentMetadata;
  };
}

export interface AirdropRecipient {
  address: string;
  username: string | null;
}

export interface AirdropPagination {
  total_count: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface AirdropsApiResponse {
  transfers: AirdropTransfer[];
  pagination: AirdropPagination;
}
