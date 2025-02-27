import { useState, useEffect, useRef, useCallback } from "react";
import { Point, SpiralConfig, TextPoint } from "@/types/spiral";
import { createPathData } from "@/lib/utils/spiralPath";

export const useSpiralAnimation = (
  config: SpiralConfig,
  words: string[],
): TextPoint[] => {
  const [textPoints, setTextPoints] = useState<TextPoint[]>([]);
  const pathRef = useRef<SVGPathElement | null>(null);
  const animationFrameRef = useRef<number>();
  const offsetRef = useRef(0);

  // Calculate rotation angle using sliding window approach
  const calculateRotation = useCallback(
    (points: Point[], index: number): number => {
      const totalPoints = points.length;
      if (totalPoints < 2) return 0;

      const windowSize = 3;
      const startIdx = Math.max(0, index - Math.floor(windowSize / 2));
      const endIdx = Math.min(
        totalPoints - 1,
        index + Math.floor(windowSize / 2),
      );

      // Calculate average direction within the window
      let sumX = 0;
      let sumY = 0;
      for (let i = startIdx; i < endIdx; i++) {
        sumX += points[i + 1][0] - points[i][0];
        sumY += points[i + 1][1] - points[i][1];
      }

      // Calculate and normalize the angle
      const angle = Math.atan2(sumY, sumX) * (180 / Math.PI);
      return angle > 90 || angle < -90 ? angle + 180 : angle;
    },
    [],
  );

  useEffect(() => {
    const updateTextPoints = () => {
      if (!pathRef.current) return;

      const totalLength = pathRef.current.getTotalLength();
      const wordsPerLoop = Math.floor(totalLength / config.spacing);
      const offset = offsetRef.current * config.baseSpeed;

      const newPoints: TextPoint[] = [];
      const positions: Point[] = [];

      // Calculate positions along the path
      for (let i = 0; i < wordsPerLoop; i++) {
        const distance = (i * config.spacing + offset) % totalLength;
        const point = pathRef.current.getPointAtLength(distance);
        positions.push([point.x, point.y]);
      }

      // Create text points with positions and rotations
      positions.forEach((position, index) => {
        newPoints.push({
          position,
          rotation: calculateRotation(positions, index),
          text: words[index % words.length],
        });
      });

      setTextPoints(newPoints);
    };

    // Initialize path element
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", createPathData(config.points));
    pathRef.current = path;

    // Start animation loop
    const animate = () => {
      offsetRef.current =
        (offsetRef.current + 1) % (pathRef.current?.getTotalLength() ?? 100);
      updateTextPoints();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [config, words, calculateRotation]);

  return textPoints;
};
