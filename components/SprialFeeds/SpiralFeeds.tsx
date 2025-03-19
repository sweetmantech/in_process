"use client";

import React from "react";
import { SpiralPath } from "./SpiralPath";
import { Collection } from "@/types/token";
import { useSpiralAnimation } from "@/hooks/useSpiralAnimation";
import { generateSpacer, formatFeedText } from "@/lib/spiralUtils";
import { Point } from "@/types/spiral";
import useIsMobile from "@/hooks/useIsMobile";

interface FeedsProps {
  feeds: Collection[];
}

export default function SpiralFeeds({ feeds }: FeedsProps) {
  const { offset, viewBox, animationConfig, points } =
    useSpiralAnimation(feeds);
  const isMobile = useIsMobile();

  return (
    <svg viewBox={viewBox} className="relative z-[20] cursor-pointer">
      <SpiralPath id="curve" points={points as Point[]} />
      <text>
        <textPath xlinkHref="#curve" startOffset={`${offset}%`}>
          {feeds.map((feed, index) => (
            <React.Fragment key={index}>
              {index > 0 && generateSpacer(animationConfig.spacerWidth)}
              {formatFeedText(feed, isMobile ? 14 : 20)}
            </React.Fragment>
          ))}
          {generateSpacer(animationConfig.loopPadding)}
        </textPath>
      </text>

      <text>
        <textPath
          xlinkHref="#curve"
          startOffset={`${offset - (isMobile ? 370 : 106)}%`}
        >
          {feeds.map((feed, index) => (
            <React.Fragment key={index}>
              {index > 0 && generateSpacer(animationConfig.spacerWidth)}
              {formatFeedText(feed, isMobile ? 14 : 20)}
            </React.Fragment>
          ))}
          {generateSpacer(animationConfig.loopPadding)}
        </textPath>
      </text>
    </svg>
  );
}
