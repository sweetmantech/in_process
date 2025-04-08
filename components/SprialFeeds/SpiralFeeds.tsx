"use client";

import React from "react";
import { SpiralPath } from "./SpiralPath";
import { Token } from "@/types/token";
import { useSpiralAnimation } from "@/hooks/useSpiralAnimation";
import { generateSpacer } from "@/lib/spiralUtils";
import { Point } from "@/types/spiral";
import { FeedTooltip } from "./FeedTooltip";
import useSpiralMouseOver from "@/hooks/useSpiralMouseOver";
import Feed from "./Feed";

interface FeedsProps {
  feeds: Token[];
}

export default function SpiralFeeds({ feeds }: FeedsProps) {
  const { offset, viewBox, animationConfig, points } =
    useSpiralAnimation(feeds);
  const { handleMouseLeave, handleMouseMove, hoveredFeed } =
    useSpiralMouseOver();

  return (
    <div className="relative">
      <svg viewBox={viewBox} className="relative z-[20] cursor-pointer">
        <SpiralPath id="curve" points={points as Point[]} />
        <text>
          <textPath xlinkHref="#curve" startOffset={`${offset}%`}>
            {[...feeds, ...feeds].map((feed, index) => (
              <Feed
                feed={feed}
                index={index}
                handleMouseLeave={handleMouseLeave}
                handleMouseMove={handleMouseMove}
                spacerWidth={animationConfig.spacerWidth}
                key={index}
              />
            ))}
            {generateSpacer(animationConfig.loopPadding)}
          </textPath>
        </text>
      </svg>

      <FeedTooltip
        feed={hoveredFeed?.feed || null}
        position={hoveredFeed?.position || null}
        isVisible={!!hoveredFeed}
      />
    </div>
  );
}
