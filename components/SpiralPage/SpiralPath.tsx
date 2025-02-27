import { Point } from "@/types/spiral";
import { createPathData } from "@/lib/utils/spiralPath";

interface SpiralPathProps {
  points: Point[];
  stroke?: string;
  strokeWidth?: number;
}

export const SpiralPath = ({
  points,
  stroke = "transparent",
  strokeWidth = 1,
}: SpiralPathProps) => {
  return (
    <path
      d={createPathData(points)}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};
