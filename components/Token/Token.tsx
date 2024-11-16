"use client";

import { useEffect, useState } from "react";
import CommentButton from "../CommentButton/CommentButton";
import { getMintCommentEvents } from "@/lib/viem/getContractEvents";
import { useComments } from "@/hooks/useComments";
import CommentSection from "./CommentSection";

interface TokenMetadata {
  name?: string;
  description?: string;
  image?: string;
  content?: {
    mime: string;
    uri: string;
  };
  canvas_url?: string;
}

interface TokenInfo {
  tokenId: string;
  tokenURI: string;
}

const Token = ({ token }: { token: { token: TokenInfo } }) => {
  const [metadata, setMetadata] = useState<TokenMetadata | null>(null);
  const { comments } = useComments(BigInt(token.token.tokenId));

  const convertIpfsToHttp = (ipfsUrl: string) => {
    if (!ipfsUrl.startsWith("ipfs://")) return ipfsUrl;
    return ipfsUrl.replace(
      "ipfs://",
      "https://ipfs.decentralized-content.com/ipfs/"
    );
  };

  useEffect(() => {
    const getTokenMetadata = async (
      tokenUri: string
    ): Promise<TokenMetadata> => {
      try {
        const response = await fetch(convertIpfsToHttp(tokenUri));
        if (!response.ok) throw new Error("Failed to fetch metadata");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching token metadata:", error);
        return {};
      }
    };

    const fetchMetadata = async () => {
      const data = await getTokenMetadata(token.token.tokenURI);
      setMetadata(data);
    };

    fetchMetadata();
  }, [token.token.tokenURI]);

  return (
    <div key={token.token.tokenId} className="border rounded-lg p-4">
      <h3>Token ID: {token.token.tokenId}</h3>
      <h3>Token URI: {convertIpfsToHttp(token.token.tokenURI)}</h3>
      {metadata && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Name: {metadata.name}</h3>
          {metadata.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={convertIpfsToHttp(metadata.image)}
              alt={metadata.name || "Token image"}
              className="mt-4 max-w-full h-auto rounded"
            />
          )}
        </div>
      )}
      <CommentSection tokenId={BigInt(token.token.tokenId)} />
      <CommentButton tokenId={BigInt(token.token.tokenId)} />
    </div>
  );
};

export default Token;
