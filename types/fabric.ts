import * as fabric from "fabric";

export type QuadraticCommand = ["Q", number, number, number, number];
export type MoveCommand = ["M", number, number];
export type PathData = Array<MoveCommand | QuadraticCommand>;

export interface CustomPath extends fabric.Path {
  path: PathData;
}

export interface Point {
  x: number;
  y: number;
}

export interface CustomControls {
  [key: string]: fabric.Control;
  start: fabric.Control;
  end: fabric.Control;
}
