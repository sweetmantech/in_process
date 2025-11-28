import { Address } from "viem";
import { MomentType } from "@/types/moment";

export type OnChainSaleConfig = {
  pricePerToken: bigint;
  saleStart: bigint;
  saleEnd: bigint;
  maxTokensPerAddress: bigint;
  fundsRecipient: Address;
  type: MomentType;
};

export type DatabaseSale = {
  price_per_token: number;
  sale_start: number;
  sale_end: number;
  max_tokens_per_address: number;
  funds_recipient: string;
  currency: string;
};
