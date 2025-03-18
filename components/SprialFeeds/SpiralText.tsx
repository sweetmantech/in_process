import { TextPoint } from "@/types/spiral";

interface SpiralTextProps {
  textPoints: TextPoint[];
  color?: string;
}

export const SpiralText = ({
  textPoints,
  color = "black",
}: SpiralTextProps) => {
  return (
    <>
      {textPoints.map((point, index) => (
        <text
          key={index}
          x={point.position[0]}
          y={point.position[1]}
          fontSize={point.fontSize}
          fontFamily={point.fontFamily}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={color}
          transform={`rotate(${point.rotation}, ${point.position[0]}, ${point.position[1]})`}
        >
          {point.text}
        </text>
      ))}
    </>
  );
};
