import { MaskRect } from "@/types/mask";

export const toMaskRect = (rect: DOMRect, svgRect: DOMRect, padding: number): MaskRect => ({
  x: rect.left - svgRect.left - padding,
  y: rect.top - svgRect.top,
  width: rect.width + padding * 2,
  height: rect.height,
});
