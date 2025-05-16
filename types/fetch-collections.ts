import { Collection } from "./token";

export interface CollectionsOffset {
  factory?: string;
  smartWallet?: string;
}
export interface CollectionsResponse {
  collections: Collection[];
  nextOffsets: CollectionsOffset;
}

export interface PageParam {
  offsets?: CollectionsOffset;
}
