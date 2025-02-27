"use client";

import { useMemo } from "react";
import { useSpiralAnimation } from "@/hooks/useSpiralAnimation";
import { SpiralPath } from "./SpiralPath";
import { SpiralText } from "./SpiralText";
import { SPIRAL_POINTS } from "../../lib/consts";
import { Collection } from "@/types/token";

interface FeedsProps {
  feeds: Collection[];
  className?: string;
}

export default function SpiralFeeds({ feeds, className = "" }: FeedsProps) {
  const viewBox = useMemo(() => {
    const minX = Math.min(...SPIRAL_POINTS.map((p) => p[0]));
    const maxX = Math.max(...SPIRAL_POINTS.map((p) => p[0]));
    const minY = Math.min(...SPIRAL_POINTS.map((p) => p[1]));
    const maxY = Math.max(...SPIRAL_POINTS.map((p) => p[1]));
    const padding = 20;

    return `${minX - padding} ${minY - padding} ${maxX - minX + 2 * padding} ${maxY - minY + 2 * padding}`;
  }, []);

  const textPoints = useSpiralAnimation(
    {
      points: SPIRAL_POINTS,
      spacing: 500,
      baseSpeed: 0.5,
    },
    feeds,
  );

  return (
    <svg
      viewBox={viewBox}
      className={`w-[90vw] h-[90vh] ${className}`}
      style={{
        aspectRatio: "auto",
        maxWidth: "100%",
        maxHeight: "100%",
        margin: "auto",
        display: "block",
      }}
      preserveAspectRatio="xMidYMid meet"
    >
      <SpiralPath points={SPIRAL_POINTS} />
      <SpiralText textPoints={textPoints} />
    </svg>
  );
}
