import { useState, useEffect, useMemo, useCallback } from "react";
import useIsMobile from "./useIsMobile";
import { calculateViewBox } from "@/lib/spiralUtils";
import { MOBILE_SPIRAL_POINTS, SPIRAL_POINTS } from "@/lib/consts";
import { InProcessMoment } from "@/types/moment";

export function useMomentsSpiral() {
  const isMobile = useIsMobile();
  const [offset, setOffset] = useState(-50);
  const [hoveredMoment, setHoveredMoment] = useState<{
    moment: InProcessMoment;
    position: { x: number; y: number };
  } | null>(null);

  const viewBox = useMemo(() => {
    const points = isMobile ? MOBILE_SPIRAL_POINTS : SPIRAL_POINTS;
    return calculateViewBox(points);
  }, [isMobile]);

  const animationConfig = useMemo(() => {
    const baseSpeed = 0.2;
    const contentFactor = 0.2;
    const adjustedSpeed = baseSpeed * contentFactor;
    const spacerWidth = 3;
    const loopPadding = 20;

    return {
      stepSize: adjustedSpeed,
      spacerWidth,
      loopPadding,
      frameRate: 15,
    };
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        if (prev >= 0) return -50;
        return prev + animationConfig.stepSize;
      });
    }, 1000 / animationConfig.frameRate);

    return () => clearInterval(interval);
  }, [animationConfig]);

  const onMomentMouseMove = useCallback((event: React.MouseEvent, moment: InProcessMoment) => {
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
      setHoveredMoment({
        moment,
        position: {
          x: svgPoint.x,
          y: svgPoint.y,
        },
      });
    }, 50);
  }, []);

  const onMomentMouseLeave = useCallback(() => {
    setTimeout(() => {
      setHoveredMoment(null);
    }, 50);
  }, []);

  return {
    offset,
    viewBox,
    animationConfig,
    points: isMobile ? MOBILE_SPIRAL_POINTS : SPIRAL_POINTS,
    onMomentMouseLeave,
    onMomentMouseMove,
    hoveredMoment,
  };
}
