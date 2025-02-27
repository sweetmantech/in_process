"use client";

import { useMemo } from "react";
import { useSpiralAnimation } from "../../hooks/useSpiralAnimation";
import { SpiralPath } from "./SpiralPath";
import { SpiralText } from "./SpiralText";
import { SPIRAL_POINTS } from "../../lib/consts";

const INITIAL_WORDS = [
  "welcome",
  "to",
  "our",
  "amazing",
  "spiral",
  "journey",
  "through",
  "space",
  "and",
  "time",
  "explore",
  "dream",
  "create",
  "inspire",
  "discover",
  "imagine",
  "believe",
  "achieve",
  "grow",
  "shine",
  "draw",
];

export default function SpiralPage() {
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
      spacing: 100,
      baseSpeed: 0.5,
    },
    INITIAL_WORDS,
  );

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <svg
        viewBox={viewBox}
        className="w-[95vw] h-[95vh]"
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
    </div>
  );
}
