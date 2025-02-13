"use client";

import { FC, useState } from "react";
import { LatestFeed } from "@/lib/viem/getUris";
import Feed from "./Feed";

interface HorizontalFeedProps {
  feeds: LatestFeed[];
  shouldCollect?: boolean;
}

const HorizontalFeed: FC<HorizontalFeedProps> = ({
  feeds,
  shouldCollect = false,
}) => {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="relative h-16">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2" />
        <div className="relative flex justify-between items-center h-full w-full">
          {feeds.slice(0, 5).map((feed: LatestFeed, i) => (
            <Feed
              key={i}
              feed={feed}
              onHover={() => setHoveredEvent(i)}
              onLeave={() => setHoveredEvent(null)}
              hovered={hoveredEvent === i}
              shouldCollect={shouldCollect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalFeed;
