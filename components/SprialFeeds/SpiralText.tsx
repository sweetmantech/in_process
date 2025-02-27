import { TextPoint } from "@/types/spiral";

interface SpiralTextProps {
  textPoints: TextPoint[];
  fontSize?: number;
  fontWeight?: string;
  color?: string;
}

export const SpiralText = ({
  textPoints,
  fontSize = 24,
  fontWeight = "bold",
  color = "black",
}: SpiralTextProps) => {
  return (
    <>
      {textPoints.map((point, index) => (
        <text
          key={index}
          x={point.position[0]}
          y={point.position[1]}
          fontSize={fontSize}
          fontWeight={fontWeight}
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
