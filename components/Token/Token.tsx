"use client";

import CommentSection from "./CommentSection";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import CollectModal from "./CollectModal";
import { Skeleton } from "../ui/skeleton";
import { formatEther } from "viem";

const Token = () => {
  const { token, saleConfig } = useTokenProvider();
  const { data, isLoading } = saleConfig;
  const { data: metadata } = useMetadata(token.token.tokenURI);
  return (
    <>
      {metadata && (
        <>
          <div>
            <h3 className="text-5xl font-archivo">{metadata.name}</h3>
            <h3 className="text-xl font-spectral pt-4">
              {metadata.description}
            </h3>
            <div className="space-y-2 mt-4">
              <p className="font-archivo text-lg">moment collection price</p>
              {isLoading ? (
                <Skeleton className="w-full h-6" />
              ) : (
                <p className="font-archivo text-base border border-black rounded-md text-center bg-tan-secondary">
                  {formatEther(BigInt(data?.pricePerToken || 0))} eth
                </p>
              )}
            </div>
            <CommentSection />
          </div>
          <div className="relative w-full aspect-[1/1]">
            <Image
              src={getFetchableUrl(metadata.image) || "/images/placeholder.png"}
              alt="Token Image."
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              blurDataURL={
                getFetchableUrl(metadata.image) || "/images/placeholder.png"
              }
              unoptimized
            />
          </div>
          <CollectModal />
        </>
      )}
    </>
  );
};

export default Token;
