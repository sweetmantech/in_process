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

  // Debounced mouse move handler
  const handleMouseMove = useCallback(
    (event: React.MouseEvent, feed: Collection) => {
      const svgElement = event.currentTarget.closest("svg");
      if (!svgElement) return;

      // Get SVG's CTM (Current Transformation Matrix)
      const pt = svgElement.createSVGPoint();
      const ctm = (event.currentTarget as SVGGraphicsElement).getScreenCTM();

      if (!ctm) return;

      // Transform mouse coordinates to SVG space
      pt.x = event.clientX;
      pt.y = event.clientY;
      const svgPoint = pt.matrixTransform(ctm.inverse());

      // Clear any existing timeout
      if ((event.currentTarget as any)._timeout) {
        clearTimeout((event.currentTarget as any)._timeout);
      }

      // Set new timeout
      (event.currentTarget as any)._timeout = setTimeout(() => {
        setHoveredFeed({
          feed,
          position: {
            x: svgPoint.x,
            y: svgPoint.y,
          },
        });
      }, 50); // 50ms delay
    },
    [],
  );

  const handleMouseLeave = useCallback(() => {
    setTimeout(() => {
      setHoveredFeed(null);
    }, 50); // 50ms delay
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
