"use client";

import React from "react";
import { SpiralPath } from "@/components/SprialFeeds/SpiralPath";
import { generateSpacer } from "@/lib/spiralUtils";
import { Point } from "@/types/legacy/spiral";
import { useMomentsSpiralProvider } from "@/providers/MomentsSpiralProvider";
import SpiralItem from "@/components/MomentsSpiral/SpiralItem";
import { useInProcessTimelineProvider } from "@/providers/InProcessTimelineProvider";
import { MomentPopover } from "@/components/MomentsSpiral/MomentPopover";

const TimelineSpiral = () => {
  const { hoveredMoment, viewBox, points, offset, animationConfig } = useMomentsSpiralProvider();
  const { moments } = useInProcessTimelineProvider();

  return (
    <div className="relative mt-12">
      <svg viewBox={viewBox} className="relative z-[20] cursor-pointer">
        <SpiralPath id="curve" points={points as Point[]} />
        <text>
          <textPath xlinkHref="#curve" startOffset={`${offset}%`}>
            {[...moments, ...moments].map((moment, index) => (
              <SpiralItem moment={moment} index={index} key={index} />
            ))}
            {generateSpacer(animationConfig.loopPadding)}
          </textPath>
        </text>
      </svg>
      {hoveredMoment && (
        <MomentPopover
          moment={hoveredMoment.moment}
          position={hoveredMoment.position}
          isVisible={!!hoveredMoment}
        />
      )}
    </div>
  );
};

export default TimelineSpiral;
