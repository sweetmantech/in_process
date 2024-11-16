"use client";

import { useEffect, useState } from "react";
import CommentButton from "../CommentButton/CommentButton";
import CommentSection from "./CommentSection";
import { useTokenProvider } from "@/providers/TokenProvider";
import { TokenMetadata } from "@/types/token";
import WriteComment from "./WriteComment";
import convertIpfsToHttp from "@/lib/ipfs/convertIpfsToHttp";
import fetchIpfs from "@/lib/ipfs/fetchIpfs";
import { useCollectionProvider } from "@/providers/CollectionProvider";

const Token = () => {
  const { token } = useTokenProvider();
  const { styling } = useCollectionProvider();
  const [metadata, setMetadata] = useState<TokenMetadata | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      const data = await fetchIpfs(token.token.tokenURI);
      setMetadata(data);
    };

    fetchMetadata();
  }, [token.token.tokenURI]);

  return (
    <div
      key={token.token.tokenId}
      className="rounded-lg p-4"
      style={{
        border: `1px solid ${styling?.theme?.color?.border}`,
      }}
    >
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
      <CommentSection />
      <WriteComment />
      <CommentButton />
    </div>
  );
};

export default Token;
