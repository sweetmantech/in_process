import React from "react";
import { useMetadata } from "@/hooks/useMetadata";
import Loading from "../Loading";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import { TimelineMoment } from "@/types/moment";

interface FeedTooltipProps {
  feed: TimelineMoment | null;
  position: { x: number; y: number } | null;
  isVisible: boolean;
}

export const FeedTooltip: React.FC<FeedTooltipProps> = ({ feed, position, isVisible }) => {
  if (!isVisible || !position || !feed) return null;

  const { isLoading, data } = useMetadata(feed.uri);

  return (
    <div
      className="pointer-events-none absolute z-50 -translate-x-full -translate-y-full transform border-[1px] border-grey-moss-900 bg-white"
      style={{
        left: `${position.x - 150}px`,
        top: `${position.y - 50}px`,
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      <div className="relative aspect-[1/1] w-[200px] bg-grey-moss-100">
        {isLoading ? (
          <Loading className="size-full" />
        ) : (
          <Image
            src={getFetchableUrl(data?.image) || ""}
            alt="not found image"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        )}
      </div>
    </div>
  );
};
