import { useMemo, useEffect, useRef, RefObject } from "react";
import useIsMobile from "./useIsMobile";
import { calculateViewBox } from "@/lib/spiralUtils";
import { MOBILE_SPIRAL_POINTS, SPIRAL_POINTS } from "@/lib/consts";

interface SpiralAnimationConfig {
  viewBox: string;
  animationConfig: {
    spacerWidth: number;
    loopPadding: number;
  };
  points: number[][];
  textPathRef: RefObject<SVGTextPathElement | null>;
}

export function useSpiralAnimation(): SpiralAnimationConfig {
  const isMobile = useIsMobile();
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const offsetRef = useRef(-50);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const animationConfig = useMemo(
    () => ({
      spacerWidth: 3,
      loopPadding: 20,
    }),
    []
  );

  useEffect(() => {
    const speed = 0.015;

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      offsetRef.current += speed * (deltaTime / 16.67);

      if (offsetRef.current >= 0) {
        offsetRef.current = -50;
      }

      if (textPathRef.current) {
        textPathRef.current.setAttribute("startOffset", `${offsetRef.current}%`);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const viewBox = useMemo(() => {
    const points = isMobile ? MOBILE_SPIRAL_POINTS : SPIRAL_POINTS;
    return calculateViewBox(points);
  }, [isMobile]);

  return {
    viewBox,
    animationConfig,
    points: isMobile ? MOBILE_SPIRAL_POINTS : SPIRAL_POINTS,
    textPathRef,
  };
}
