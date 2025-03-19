"use client";

import React, { useState, useCallback } from "react";
import { SpiralPath } from "./SpiralPath";
import { Collection } from "@/types/token";
import { useSpiralAnimation } from "@/hooks/useSpiralAnimation";
import { generateSpacer, formatFeedText } from "@/lib/spiralUtils";
import { Point } from "@/types/spiral";
import useIsMobile from "@/hooks/useIsMobile";
import { FeedTooltip } from "./FeedTooltip";

interface FeedsProps {
  feeds: Collection[];
}

export default function SpiralFeeds({ feeds }: FeedsProps) {
  const { offset, viewBox, animationConfig, points } =
    useSpiralAnimation(feeds);
  const isMobile = useIsMobile();
  const [hoveredFeed, setHoveredFeed] = useState<{
    feed: Collection;
    position: { x: number; y: number };
  } | null>(null);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent, feed: Collection) => {
      const svgElement = event.currentTarget.closest("svg");
      if (!svgElement) return;

      const pt = svgElement.createSVGPoint();
      const ctm = (event.currentTarget as SVGGraphicsElement).getScreenCTM();

      if (!ctm) return;

      pt.x = event.clientX;
      pt.y = event.clientY;
      const svgPoint = pt.matrixTransform(ctm.inverse());

      if ((event.currentTarget as any)._timeout) {
        clearTimeout((event.currentTarget as any)._timeout);
      }

      (event.currentTarget as any)._timeout = setTimeout(() => {
        setHoveredFeed({
          feed,
          position: {
            x: svgPoint.x,
            y: svgPoint.y,
          },
        });
      }, 50);
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setTimeout(() => {
      setHoveredFeed(null);
    }, 50);
  }, []);

  return (
    <div className="relative">
      <svg viewBox={viewBox} className="relative z-[20] cursor-pointer">
        <SpiralPath id="curve" points={points as Point[]} />
        <text>
          <textPath xlinkHref="#curve" startOffset={`${offset}%`}>
            {feeds.map((feed, index) => (
              <React.Fragment key={index}>
                {index > 0 && generateSpacer(animationConfig.spacerWidth)}
                <tspan
                  onMouseMove={(e) => handleMouseMove(e, feed)}
                  onMouseLeave={handleMouseLeave}
                >
                  {formatFeedText(feed, isMobile ? 14 : 20)}
                </tspan>
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
                <tspan
                  onMouseMove={(e) => handleMouseMove(e, feed)}
                  onMouseLeave={handleMouseLeave}
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
