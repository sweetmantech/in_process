"use client";

import React from "react";
import { SpiralPath } from "@/components/SprialFeeds/SpiralPath";
import { generateSpacer } from "@/lib/spiralUtils";
import { Point } from "@/types/legacy/spiral";
import Moment from "@/components/MomentsSpiral/Moment";
import { useMomentsSpiralProvider } from "@/providers/MomentsSpiralProvider";
import { useInProcessTimelineProvider } from "@/providers/InProcessTimelineProvider";
import { MomentPopover } from "../MomentsSpiral/MomentPopover";

const TimelineSpiral = () => {
  const { offset, viewBox, animationConfig, points, hoveredMoment } = useMomentsSpiralProvider();
  const { moments } = useInProcessTimelineProvider();

  return (
    <div className="relative mt-12">
      <svg viewBox={viewBox} className="relative z-[20] cursor-pointer">
        <SpiralPath id="curve" points={points as Point[]} />
        <text>
          <textPath xlinkHref="#curve" startOffset={`${offset}%`}>
            {[...moments, ...moments].map((moment, index) => (
              <Moment moment={moment} index={index} key={index} />
            ))}
            {generateSpacer(animationConfig.loopPadding)}
          </textPath>
        </text>
      </svg>
      {hoveredMoment?.moment && (
        <MomentPopover
          moment={hoveredMoment.moment}
          position={hoveredMoment.position}
          isVisible={!!hoveredMoment.moment}
        />
      )}
    </div>
  );
};

export default TimelineSpiral;
