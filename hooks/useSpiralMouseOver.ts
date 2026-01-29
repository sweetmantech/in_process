import { useState, useCallback, useRef } from "react";
import { TimelineMoment } from "@/types/moment";

const useSpiralMouseOver = () => {
  const [hoveredFeed, setHoveredFeed] = useState<{
    feed: TimelineMoment;
    position: { x: number; y: number };
  } | null>(null);

  const lastUpdateRef = useRef<number>(0);
  const throttleMs = 100;

  const handleMouseMove = useCallback((event: React.MouseEvent, feed: TimelineMoment) => {
    const now = Date.now();
    if (now - lastUpdateRef.current < throttleMs) return;
    lastUpdateRef.current = now;

    const svgElement = event.currentTarget.closest("svg");
    if (!svgElement) return;

    const pt = svgElement.createSVGPoint();
    const ctm = (event.currentTarget as SVGGraphicsElement).getScreenCTM();

    if (!ctm) return;

    pt.x = event.clientX;
    pt.y = event.clientY;
    const svgPoint = pt.matrixTransform(ctm.inverse());

    setHoveredFeed({
      feed,
      position: {
        x: svgPoint.x,
        y: svgPoint.y,
      },
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredFeed(null);
  }, []);

  return {
    handleMouseLeave,
    handleMouseMove,
    hoveredFeed,
  };
};

export default useSpiralMouseOver;
