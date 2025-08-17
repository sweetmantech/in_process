"use client";

import React, { useState, useEffect } from "react";
import { SpiralPath } from "@/components/SprialFeeds/SpiralPath";
import { useSpiralAnimation } from "@/hooks/useSpiralAnimation";
import { generateSpacer } from "@/lib/spiralUtils";
import { Point } from "@/types/spiral";
import { FeedTooltip } from "@/components/SprialFeeds/FeedTooltip";
import useSpiralMouseOver from "@/hooks/useSpiralMouseOver";
import Feed from "@/components/SprialFeeds/Feed";
import { useTimelineApiContext } from "@/providers/TimelineApiProvider";
import { mapMomentToToken } from "@/lib/timeline/mapMomentToToken";
import { fullscreenManager } from "@/lib/fullscreenManager";

const TimelineSpiral = () => {
  const { offset, viewBox, animationConfig, points } = useSpiralAnimation();
  const { handleMouseLeave, handleMouseMove, hoveredFeed } = useSpiralMouseOver();
  const { moments } = useTimelineApiContext();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Listen for fullscreen changes
    const unsubscribe = fullscreenManager.addListener((fullscreen) => {
      setIsFullscreen(fullscreen);
    });

    // Set initial state
    setIsFullscreen(fullscreenManager.getIsFullscreen());

    return unsubscribe;
  }, []);

  return (
    <div 
      className="relative mt-12"
      style={{
        pointerEvents: isFullscreen ? 'none' : 'auto',
      }}
    >
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
