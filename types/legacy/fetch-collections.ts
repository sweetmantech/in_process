import { Collection } from "./token";

export interface CollectionsOffset {
  factory?: string;
  smartWallet?: string;
}
export interface CollectionsResponse {
  collections: Collection[];
  nextOffsets: CollectionsOffset;
  artistAddress?: string;
}

export interface PageParam {
  offsets: CollectionsOffset | undefined;
  artistAddress: string | undefined;
}
