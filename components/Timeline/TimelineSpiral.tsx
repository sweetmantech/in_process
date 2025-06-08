"use client";

import React from "react";
import { SpiralPath } from "@/components/SprialFeeds/SpiralPath";
import { useSpiralAnimation } from "@/hooks/useSpiralAnimation";
import { generateSpacer } from "@/lib/spiralUtils";
import { Point } from "@/types/spiral";
import { FeedTooltip } from "@/components/SprialFeeds/FeedTooltip";
import useSpiralMouseOver from "@/hooks/useSpiralMouseOver";
import Feed from "@/components/SprialFeeds/Feed";
import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import { Token } from "@/types/token";
import { TimelineMoment } from "@/hooks/useTimelineApi";
import { CHAIN } from "@/lib/consts";

// Map TimelineMoment to Token for Feed compatibility
function mapMomentToToken(moment: TimelineMoment): Token {
  return {
    uri: moment.uri,
    creator: moment.address,
    tokenId: moment.tokenId,
    collection: moment.address,
    released_at: Date.parse(moment.createdAt) || 0,
    chain: CHAIN.name,
    chainId: moment.chainId,
    created_at: Date.parse(moment.createdAt) || 0,
  };
}

// Spiral visualization for timeline moments
const TimelineSpiral = () => {
  const { offset, viewBox, animationConfig, points } = useSpiralAnimation();
  const { handleMouseLeave, handleMouseMove, hoveredFeed } =
    useSpiralMouseOver();
  const { moments } = useTimelineApiContext();

  return (
    <div className="relative mt-12">
      <svg viewBox={viewBox} className="relative z-[20] cursor-pointer">
        <SpiralPath id="curve" points={points as Point[]} />
        <text>
          <textPath xlinkHref="#curve" startOffset={`${offset}%`}>
            {[...moments, ...moments].map((moment, index) => (
              <Feed
                feed={mapMomentToToken(moment)}
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
};

export default TimelineSpiral;
