"use client";

import CommentButton from "../CommentButton/CommentButton";
import CommentSection from "./CommentSection";
import { useTokenProvider } from "@/providers/TokenProvider";
import WriteComment from "./WriteComment";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";

const Token = () => {
  const { token } = useTokenProvider();
  const { styling } = useCollectionProvider();
  const { data: metadata } = useMetadata(token.token.tokenURI);

  return (
    <div
      key={token.token.tokenId}
      className="rounded-lg p-4"
      style={{
        border: `1px solid ${styling?.theme?.color?.border}`,
      }}
    >
      {metadata && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">{metadata.name}</h3>
          {metadata.image && (
            <div className="relative w-[300px] aspect-[1/1]">
              <Image
                src={
                  getFetchableUrl(metadata.image) || "/images/placeholder.png"
                }
                alt="Token Image."
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                blurDataURL={
                  getFetchableUrl(metadata.image) || "/images/placeholder.png"
                }
              />
            </div>
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
