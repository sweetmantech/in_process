import { Address } from "viem";

export interface TokenMetadata {
  name?: string;
  description?: string;
  image?: string;
  content?: {
    mime: string;
    uri: string;
  };
  canvas_url?: string;
}

export interface TokenInfo {
  token: {
    tokenId: string;
    tokenURI: string;
  };
}

export interface Metadata {
  image: string;
  name: string;
  description: string;
}

export interface Collection {
  contractURI: string;
  creator: Address;
  defaultAdmin: Address;
  defaultRoyaltyConfiguration: [string, string, string];
  name: string;
  newContract: Address;
  released_at: number;
  chain: string;
  chainId: number;
}
