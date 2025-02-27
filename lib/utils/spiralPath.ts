import { Point } from "@/types/spiral";

export const getCatmullRomControlPoints = (
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  tension: number = 0.5,
): [Point, Point] => {
  const t = tension;
  const x1 = p1[0] + ((p2[0] - p0[0]) / 6) * t;
  const y1 = p1[1] + ((p2[1] - p0[1]) / 6) * t;
  const x2 = p2[0] - ((p3[0] - p1[0]) / 6) * t;
  const y2 = p2[1] - ((p3[1] - p1[1]) / 6) * t;
  return [
    [x1, y1],
    [x2, y2],
  ];
};

export const createPathData = (points: Point[]): string => {
  if (points.length < 2) return "";

  let pathData = `M ${points[0][0]},${points[0][1]}`;

  if (points.length > 2) {
    // Handle first segment with virtual start point
    const virtual_p0: Point = [
      points[0][0] - (points[1][0] - points[0][0]),
      points[0][1] - (points[1][1] - points[0][1]),
    ];
    const [cp1, cp2] = getCatmullRomControlPoints(
      virtual_p0,
      points[0],
      points[1],
      points[2],
    );
    pathData += ` C ${cp1[0]},${cp1[1]} ${cp2[0]},${cp2[1]} ${points[1][0]},${points[1][1]}`;
  }

  // Handle middle segments
  for (let i = 0; i < points.length - 3; i++) {
    const [cp1, cp2] = getCatmullRomControlPoints(
      points[i],
      points[i + 1],
      points[i + 2],
      points[i + 3],
    );
    pathData += ` C ${cp1[0]},${cp1[1]} ${cp2[0]},${cp2[1]} ${points[i + 2][0]},${points[i + 2][1]}`;
  }

  if (points.length > 2) {
    // Handle last segment with virtual end point
    const n = points.length;
    const virtual_p3: Point = [
      points[n - 1][0] + (points[n - 1][0] - points[n - 2][0]),
      points[n - 1][1] + (points[n - 1][1] - points[n - 2][1]),
    ];
    const [cp1, cp2] = getCatmullRomControlPoints(
      points[n - 3],
      points[n - 2],
      points[n - 1],
      virtual_p3,
    );
    pathData += ` C ${cp1[0]},${cp1[1]} ${cp2[0]},${cp2[1]} ${points[n - 1][0]},${points[n - 1][1]}`;
  }

  return pathData;
};
