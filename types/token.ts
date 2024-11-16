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
