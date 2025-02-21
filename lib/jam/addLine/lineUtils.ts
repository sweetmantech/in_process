import * as fabric from "fabric";
import { CustomPath, Point } from "../../../types/fabric";

export const findNearestConnectionPoint = (
  canvas: fabric.Canvas,
  pointer: Point,
): Point | null => {
  let minDistance = Infinity;
  let nearestPoint: Point | null = null;

  const groups = canvas.getObjects("group");

  groups.forEach((group) => {
    if (group instanceof fabric.Group) {
      const connectionPoints = group.getObjects("circle");

      connectionPoints.forEach((point) => {
        if (point instanceof fabric.Circle) {
          const groupCenter = group.getCenterPoint();
          const pointLeft = groupCenter.x + (point.left || 0) * group.scaleX;
          const pointTop = groupCenter.y + (point.top || 0) * group.scaleY;

          const distance = Math.sqrt(
            Math.pow(pointer.x - pointLeft, 2) +
              Math.pow(pointer.y - pointTop, 2),
          );

          if (distance < minDistance && distance < 20) {
            minDistance = distance;
            nearestPoint = { x: pointLeft, y: pointTop };
          }
        }
      });
    }
  });

  return nearestPoint;
};

export const updateCurvature = (path: CustomPath) => {
  const start = { x: path.path[0][1] as number, y: path.path[0][2] as number };
  const end = { x: path.path[1][3] as number, y: path.path[1][4] as number };

  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  const distance = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2),
  );

  const curveOffset = Math.min(distance * 0.2, 50);

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const perpX = -dy;
  const perpY = dx;

  const length = Math.sqrt(perpX * perpX + perpY * perpY) || 1;
  const controlX = midX + (perpX / length) * curveOffset;
  const controlY = midY + (perpY / length) * curveOffset;

  path.path[1][1] = controlX;
  path.path[1][2] = controlY;
};
