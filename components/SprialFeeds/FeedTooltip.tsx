import React from "react";
import { useMetadata } from "@/hooks/useMetadata";
import Loading from "../Loading";
import BlurImage from "@/components/BlurImage";
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
      className="pointer-events-none absolute z-50 border-[1px] border-grey-moss-900 bg-white"
      style={{
        left: `${position.x + 10}px`,
        top: `${position.y + 10}px`,
      }}
    >
      <div className="relative aspect-[1/1] w-[200px] bg-grey-moss-100">
        {isLoading ? (
          <Loading className="size-full" />
        ) : !data?.image ? (
          <div className="flex size-full items-center justify-center text-sm text-grey-moss-500">
            No preview
          </div>
        ) : (
          <BlurImage
            src={data.image}
            alt="not found image"
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        )}
      </div>
    </div>
  );
};
