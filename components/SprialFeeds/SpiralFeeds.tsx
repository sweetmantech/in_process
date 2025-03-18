"use client";

import { useMemo } from "react";
import { useSpiralAnimation } from "@/hooks/useSpiralAnimation";
import { SpiralPath } from "./SpiralPath";
import { SpiralText } from "./SpiralText";
import { MOBILE_SPIRAL_POINTS, SPIRAL_POINTS } from "../../lib/consts";
import { Collection } from "@/types/token";
import useIsMobile from "@/hooks/useIsMobile";

interface FeedsProps {
  feeds: Collection[];
  className?: string;
}

export default function SpiralFeeds({ feeds, className = "" }: FeedsProps) {
  const isMobile = useIsMobile();

  const viewBox = useMemo(() => {
    const points = isMobile ? MOBILE_SPIRAL_POINTS : SPIRAL_POINTS;
    const minX = Math.min(...points.map((p) => p[0]));
    const maxX = Math.max(...points.map((p) => p[0]));
    const minY = Math.min(...points.map((p) => p[1]));
    const maxY = Math.max(...points.map((p) => p[1]));
    const padding = 20;

    return `${minX - padding} ${minY - padding} ${maxX - minX + 2 * padding} ${maxY - minY + 2 * padding}`;
  }, [isMobile]);

  const textPoints = useSpiralAnimation(
    {
      points: isMobile ? MOBILE_SPIRAL_POINTS : SPIRAL_POINTS,
      spacing: isMobile ? 300 : 1000,
      baseSpeed: 0.5,
    },
    feeds,
  );

  return (
    <svg
      viewBox={viewBox}
      className={`w-screen md:w-[90vw] md:h-[90vh] ${className}`}
      style={{
        aspectRatio: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "auto",
        display: "block",
      }}
      preserveAspectRatio="xMidYMid meet"
    >
      <SpiralPath points={isMobile ? MOBILE_SPIRAL_POINTS : SPIRAL_POINTS} />
      <SpiralText textPoints={textPoints} />
    </svg>
  );
}
