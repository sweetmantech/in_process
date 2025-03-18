import { useState, useEffect, useMemo } from "react";
import { Collection } from "@/types/token";
import useIsMobile from "./useIsMobile";
import { calculateViewBox, getContentLength } from "@/lib/spiralUtils";
import { MOBILE_SPIRAL_POINTS, SPIRAL_POINTS } from "@/lib/consts";

interface SpiralAnimationConfig {
  offset: number;
  viewBox: string;
  animationConfig: {
    stepSize: number;
    spacerWidth: number;
    loopPadding: number;
    frameRate: number;
  };
  points: number[][];
}

export function useSpiralAnimation(feeds: Collection[]): SpiralAnimationConfig {
  const isMobile = useIsMobile();
  const [offset, setOffset] = useState(0);

  // Calculate total content length for dynamic speed adjustment
  const contentLength = useMemo(() => getContentLength(feeds), [feeds]);

  // Animation settings based on content
  const animationConfig = useMemo(() => {
    // Adjust speed based on content length (slower for more content)
    // This creates a consistent visual flow regardless of content amount
    const baseSpeed = 0.15;
    const contentFactor = Math.min(1, 100 / (contentLength || 100));
    const adjustedSpeed = baseSpeed * contentFactor;

    // Calculate spacing between items and add extra padding for loop transition
    const spacerWidth = 15;
    const loopPadding = 20; // Extra padding to prevent overlap during loop

    return {
      stepSize: adjustedSpeed,
      spacerWidth,
      loopPadding,
      frameRate: 15, // fps
    };
  }, [contentLength]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        // Full loop in 0-100 range (now incrementing for left-to-right flow)
        if (prev >= 100) return 0;
        return prev + animationConfig.stepSize;
      });
    }, 1000 / animationConfig.frameRate);

    return () => clearInterval(interval);
  }, [animationConfig]);

  const viewBox = useMemo(() => {
    const points = isMobile ? MOBILE_SPIRAL_POINTS : SPIRAL_POINTS;
    return calculateViewBox(points);
  }, [isMobile]);

  return {
    offset,
    viewBox,
    animationConfig,
    points: isMobile ? MOBILE_SPIRAL_POINTS : SPIRAL_POINTS,
  };
}
