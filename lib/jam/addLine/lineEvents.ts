import * as fabric from "fabric";
import { CustomPath, Point } from "../../../types/fabric";
import { findNearestConnectionPoint, updateCurvature } from "./lineUtils";

export const updateLineEndpoints = (
  canvas: fabric.Canvas,
  path: CustomPath,
  start?: Point,
  end?: Point,
) => {
  if (start) {
    path.path[0][1] = start.x;
    path.path[0][2] = start.y;
  }

  if (end) {
    path.path[1][3] = end.x;
    path.path[1][4] = end.y;
  }

  updateCurvature(path);
  path.setCoords();

  if (path.controls) {
    Object.values(path.controls).forEach((control) => {
      if (control && control.positionHandler) {
        control.positionHandler(
          new fabric.Point(0, 0),
          path.calcTransformMatrix(),
          path,
          control,
        );
      }
    });
  }

  canvas.requestRenderAll();
};

export const handleLineModified = (canvas: fabric.Canvas, line: CustomPath) => {
  const start = { x: line.path[0][1] as number, y: line.path[0][2] as number };
  const end = { x: line.path[1][3] as number, y: line.path[1][4] as number };

  const snapStart = findNearestConnectionPoint(canvas, start);
  const snapEnd = findNearestConnectionPoint(canvas, end);

  updateLineEndpoints(canvas, line, snapStart || start, snapEnd || end);
};
