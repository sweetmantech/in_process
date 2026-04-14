import type { MomentMetadata, Protocol } from "./moment";

export type PaymentsTab = "income" | "outcome";

export interface PaymentFeeRecipient {
  artist_address: string;
  percent_allocation: number;
}

export interface PaymentTransferCollector {
  address: string;
  username: string | null;
}

export interface PaymentTransferMomentArtist {
  address: string;
  username: string | null;
}

export interface PaymentTransferMoment {
  token_id: number;
  fee_recipients: PaymentFeeRecipient[];
  collection: {
    address: string;
    chain_id: number;
    protocol: Protocol;
    artist?: PaymentTransferMomentArtist | null;
  };
  metadata: MomentMetadata | null;
}

/** GET `/transfers?type=payment` — one row (used directly in the payments UI). */
export interface PaymentTransferRow {
  id: string | number;
  quantity: number;
  value: number;
  currency: string | null;
  transaction_hash: string;
  transferred_at: string;
  collector: PaymentTransferCollector;
  moment: PaymentTransferMoment;
}

export interface TransferPaymentsResponse {
  transfers: PaymentTransferRow[];
  pagination: {
    total_count: number;
    page: number;
    limit: number;
    total_pages: number;
  };
}

/** Notifications API shape (differs from transfer rows). */
export type InProcessPayment = {
  id: string;
  moment: {
    id: string;
    token_id: number;
    uri: string;
    collection: {
      address: string;
      chain_id: number;
      creator: string;
    };
    fee_recipients: PaymentFeeRecipient[];
    metadata: MomentMetadata | null;
  };
  buyer: {
    address: string;
    username: string | null;
  };
  amount: number;
  transaction_hash: string;
  transferred_at: string;
  currency: string;
};
