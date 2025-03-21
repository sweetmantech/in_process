"use client";

import React from "react";
import { SpiralPath } from "./SpiralPath";
import { Collection } from "@/types/token";
import { useSpiralAnimation } from "@/hooks/useSpiralAnimation";
import { generateSpacer, formatFeedText } from "@/lib/spiralUtils";
import { Point } from "@/types/spiral";
import useIsMobile from "@/hooks/useIsMobile";
import { FeedTooltip } from "./FeedTooltip";
import useSpiralMouseOver from "@/hooks/useSpiralMouseOver";
import { useRouter } from "next/navigation";

interface FeedsProps {
  feeds: Collection[];
}

export default function SpiralFeeds({ feeds }: FeedsProps) {
  const { offset, viewBox, animationConfig, points } =
    useSpiralAnimation(feeds);
  const isMobile = useIsMobile();
  const { handleMouseLeave, handleMouseMove, hoveredFeed } =
    useSpiralMouseOver();
  const { push } = useRouter();

  return (
    <div className="relative">
      <svg viewBox={viewBox} className="relative z-[20] cursor-pointer">
        <SpiralPath id="curve" points={points as Point[]} />
        <text>
          <textPath xlinkHref="#curve" startOffset={`${offset}%`}>
            {[...feeds, ...feeds].map((feed, index) => (
              <React.Fragment key={index}>
                {index > 0 && generateSpacer(animationConfig.spacerWidth)}
                <tspan
                  onMouseMove={(e) => handleMouseMove(e, feed)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => push(`/${feed.creator}`)}
                >
                  {formatFeedText(feed, isMobile ? 14 : 20)}
                </tspan>
              </React.Fragment>
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
