export type Point = [number, number];

export interface SpiralConfig {
  points: Point[];
  spacing: number;
  baseSpeed: number;
}

export interface TextPoint {
  position: Point;
  rotation: number;
  text: string;
  index: number;
  fontFamily: string;
  fontSize: number;
}
