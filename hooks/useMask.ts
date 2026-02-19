import { useCallback, useEffect, useId, useRef, useState } from "react";
import useIsMobile from "./useIsMobile";
import { usePathname } from "next/navigation";
import { toMaskRect } from "@/lib/create/toMaskRect";
import { MaskRect } from "@/types/mask";

export const useMask = (isOpenAdvanced: boolean, writingText: string) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [svgEl, setSvgEl] = useState<SVGSVGElement | null>(null);
  const svgRef = useCallback((node: SVGSVGElement | null) => setSvgEl(node), []);
  const maskId = useId();
  const isMobile = useIsMobile();
  const [masks, setMasks] = useState<MaskRect[]>([]);
  const padding = isMobile ? 5 : 20;
  const pathname = usePathname();

  useEffect(() => {
    const updateMasks = () => {
      if (!svgEl) return;
      const svgRect = svgEl.getBoundingClientRect();
      setMasks(
        [inputRef, titleRef]
          .map((ref) => ref.current?.getBoundingClientRect())
          .filter((rect): rect is DOMRect => rect != null)
          .map((rect) => toMaskRect(rect, svgRect, padding))
      );
    };

    updateMasks();
    window.addEventListener("resize", updateMasks);
    return () => window.removeEventListener("resize", updateMasks);
  }, [svgEl, pathname, isOpenAdvanced, writingText]);

  return { masks, svgRef, maskId, inputRef, titleRef };
};
