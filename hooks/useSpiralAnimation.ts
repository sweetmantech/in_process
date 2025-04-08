import { useState, useEffect, useMemo } from "react";
import { Collection, Token } from "@/types/token";
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

export function useSpiralAnimation(feeds: Token[]): SpiralAnimationConfig {
  const isMobile = useIsMobile();
  const [offset, setOffset] = useState(-50);

  const contentLength = useMemo(() => getContentLength(feeds), [feeds]);

  const animationConfig = useMemo(() => {
    const baseSpeed = 0.15;
    const contentFactor = Math.min(1, 100 / (contentLength || 100));
    const adjustedSpeed = baseSpeed * contentFactor;
    const spacerWidth = isMobile ? 10 : 15;
    const loopPadding = 20;

    return {
      stepSize: adjustedSpeed,
      spacerWidth,
      loopPadding,
      frameRate: 15,
    };
  }, [contentLength, isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
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
