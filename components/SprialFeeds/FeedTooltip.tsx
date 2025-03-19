import React from "react";
import { Collection } from "@/types/token";
import { useMetadata } from "@/hooks/useMetadata";
import Loading from "../Loading";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";

interface FeedTooltipProps {
  feed: Collection | null;
  position: { x: number; y: number } | null;
  isVisible: boolean;
}

export const FeedTooltip: React.FC<FeedTooltipProps> = ({
  feed,
  position,
  isVisible,
}) => {
  if (!isVisible || !position || !feed) return null;
  // eslint-disable-next-line
  const { isLoading, data } = useMetadata(feed.contractURI);

  return (
    <div
      className="absolute border-[1px] border-black z-50 bg-white transform -translate-y-full -translate-x-full pointer-events-none"
      style={{
        left: `${position.x - 150}px`,
        top: `${position.y - 50}px`,
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      <div className="w-[200px] aspect-[1/1] relative">
        {isLoading ? (
          <Loading className="size-full" />
        ) : (
          <Image
            src={getFetchableUrl(data?.image) || ""}
            alt="not found image"
            layout="fill"
            objectFit="left top"
            objectPosition="center"
          />
        )}
      </div>
    </div>
  );
};
