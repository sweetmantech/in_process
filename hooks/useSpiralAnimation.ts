import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SpiralConfig, TextPoint } from "@/types/spiral";
import { createPathData } from "@/lib/utils/spiralPath";

export const useSpiralAnimation = (
  config: SpiralConfig,
  words: string[],
): TextPoint[] => {
  const [textPoints, setTextPoints] = useState<TextPoint[]>([]);
  const pathRef = useRef<SVGPathElement | null>(null);
  const animationFrameRef = useRef<number>();
  const offsetRef = useRef(0);

  // Memoize path data
  const pathData = useMemo(
    () => createPathData(config.points),
    [config.points],
  );

  // Animation speed control
  const speedMultiplier = 4; // Increase this to make animation faster
  const frameSkip = 2; // Skip frames for smoother performance

  // Calculate rotation angle using path tangents
  const calculateRotation = useCallback(
    (path: SVGPathElement, distance: number, totalLength: number): number => {
      // Get points slightly before and after for tangent calculation
      const before = path.getPointAtLength(
        (distance - 1 + totalLength) % totalLength,
      );
      const current = path.getPointAtLength(distance);
      const after = path.getPointAtLength((distance + 1) % totalLength);

      // Calculate direction vectors
      const dx1 = current.x - before.x;
      const dy1 = current.y - before.y;
      const dx2 = after.x - current.x;
      const dy2 = after.y - current.y;

      // Average the two vectors for smoother rotation
      const dx = (dx1 + dx2) / 2;
      const dy = (dy1 + dy2) / 2;

      // Calculate and normalize the angle
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      return angle > 90 || angle < -90 ? angle + 180 : angle;
    },
    [],
  );

  // Initialize path element once
  useEffect(() => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    pathRef.current = path;

    return () => {
      pathRef.current = null;
    };
  }, [pathData]);

  // Animation effect
  useEffect(() => {
    if (!pathRef.current) return;

    const updateTextPoints = () => {
      const path = pathRef.current;
      if (!path) return;

      const totalLength = path.getTotalLength();
      const wordsPerLoop = Math.floor(totalLength / config.spacing);
      const offset = offsetRef.current * (config.baseSpeed * speedMultiplier);

      const newPoints: TextPoint[] = [];

      // Calculate positions and rotations along the path
      for (let i = 0; i < wordsPerLoop; i++) {
        const distance = (i * config.spacing + offset) % totalLength;
        const point = path.getPointAtLength(distance);
        const rotation = calculateRotation(path, distance, totalLength);

        newPoints.push({
          position: [point.x, point.y],
          rotation,
          text: words[i % words.length],
        });
      }

      setTextPoints(newPoints);
    };

    let frameCount = 0;
    // Start animation loop with frame skipping
    const animate = () => {
      frameCount = (frameCount + 1) % frameSkip;
      if (frameCount === 0) {
        offsetRef.current =
          (offsetRef.current + 1) % (pathRef.current?.getTotalLength() ?? 100);
        updateTextPoints();
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [config, words, calculateRotation, pathData]);

  return textPoints;
};
