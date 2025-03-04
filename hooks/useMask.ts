import { useEffect, useId, useRef, useState } from "react";

export const useMask = (createModeActive: boolean) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const maskId = useId();
  const [masks, setMasks] = useState<
    Array<{ x: number; y: number; width: number; height: number }>
  >([]);
  const MASK_PADDING = 20;

  useEffect(() => {
    const updateMasks = () => {
      if (!svgRef.current) return;
      const svgRect = svgRef.current.getBoundingClientRect();
      const newMasks = [];

      if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        newMasks.push({
          x: rect.left - svgRect.left - MASK_PADDING,
          y: rect.top - svgRect.top,
          width: rect.width + MASK_PADDING * 2,
          height: rect.height,
        });
      }

      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        newMasks.push({
          x: rect.left - svgRect.left - MASK_PADDING,
          y: rect.top - svgRect.top,
          width: rect.width + MASK_PADDING * 2,
          height: rect.height,
        });
      }

      setMasks(newMasks);
    };

    updateMasks();
    window.addEventListener("resize", updateMasks);
    return () => window.removeEventListener("resize", updateMasks);
  }, [inputRef, titleRef, createModeActive]);

  return { masks, svgRef, maskId, inputRef, titleRef };
};
