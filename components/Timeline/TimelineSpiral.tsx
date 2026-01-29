"use client";

import { useMemo } from "react";
import { SpiralPath } from "@/components/SprialFeeds/SpiralPath";
import { useSpiralAnimation } from "@/hooks/useSpiralAnimation";
import { generateSpacer } from "@/lib/spiralUtils";
import { Point } from "@/types/spiral";
import { FeedTooltip } from "@/components/SprialFeeds/FeedTooltip";
import useSpiralMouseOver from "@/hooks/useSpiralMouseOver";
import Feed from "@/components/SprialFeeds/Feed";
import { useTimelineProvider } from "@/providers/TimelineProvider";

const TimelineSpiral = () => {
  const { viewBox, animationConfig, points, textPathRef } = useSpiralAnimation();
  const { handleMouseLeave, handleMouseMove, hoveredFeed } = useSpiralMouseOver();
  const { moments } = useTimelineProvider();

  const duplicatedMoments = useMemo(() => [...moments, ...moments], [moments]);

  return (
    <div className="relative mt-12">
      <svg viewBox={viewBox} className="relative z-[20] cursor-pointer">
        <SpiralPath id="curve" points={points as Point[]} />
        <text>
          <textPath ref={textPathRef} xlinkHref="#curve" startOffset="-50%">
            {duplicatedMoments.map((moment, index) => (
              <Feed
                feed={moment}
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
