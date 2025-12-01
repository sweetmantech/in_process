import { useState, useCallback } from "react";
import { TimelineMoment } from "@/types/moment";

const useSpiralMouseOver = () => {
  const [hoveredFeed, setHoveredFeed] = useState<{
    feed: TimelineMoment;
    position: { x: number; y: number };
  } | null>(null);

  const handleMouseMove = useCallback((event: React.MouseEvent, feed: TimelineMoment) => {
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
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTimeout(() => {
      setHoveredFeed(null);
    }, 50);
  }, []);

  return {
    handleMouseLeave,
    handleMouseMove,
    hoveredFeed,
  };
};

export default useSpiralMouseOver;
