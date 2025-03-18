import { Point } from "@/types/spiral";
import { createPathData } from "@/lib/utils/spiralPath";

interface SpiralPathProps {
  points: Point[];
  stroke?: string;
  strokeWidth?: number;
  id?: string;
}

export const SpiralPath = ({
  points,
  stroke = "transparent",
  strokeWidth = 1,
  id,
}: SpiralPathProps) => {
  return (
    <path
      id={id}
      d={createPathData(points)}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};
