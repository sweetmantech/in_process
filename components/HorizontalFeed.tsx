"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { NftMetadata } from "@/lib/viem/getMetadata";

interface HorizontalFeedProps {
  feed: NftMetadata[];
}

const HorizontalFeed: FC<HorizontalFeedProps> = ({ feed }) => {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="relative h-16">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2" />
        <div className="relative flex justify-between items-center h-full w-full">
          {feed.slice(0, 5).map((feed: NftMetadata) => (
            <div
              key={`${feed.address}-${feed.tokenId}-${feed.chainId}`}
              className="relative"
            >
              <button
                className="w-5 h-5 bg-black rounded-full relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 transition-transform hover:scale-110"
                onMouseEnter={() =>
                  setHoveredEvent(
                    `${feed.address}-${feed.tokenId}-${feed.chainId}`,
                  )
                }
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <span className="sr-only">{feed.name}</span>
              </button>
              {hoveredEvent ===
                `${feed.address}-${feed.tokenId}-${feed.chainId}` && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white shadow-lg rounded-lg p-2 md:p-4 transition-opacity duration-200 ease-in-out">
                  <div className="w-[60px] md:w-[150px] aspect-[1/1] overflow-hidden relative">
                    <Image
                      src={feed.image}
                      alt={feed.name}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      blurDataURL={feed.image}
                    />
                  </div>
                  <h3 className="font-semibold text-sm text-center">
                    {feed.name}
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalFeed;
