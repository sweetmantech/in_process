import * as fabric from "fabric";
import { CustomPath } from "@/types/fabric";

export const updateCurvature = (path: CustomPath) => {
  const start = {
    x: path.path[0][1] as number,
    y: path.path[0][2] as number,
  };
  const end = { x: path.path[1][3] as number, y: path.path[1][4] as number };

  // Calculate the midpoint
  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  // Calculate the distance between points
  const distance = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2),
  );

  // Calculate control point offset based on distance
  const curveOffset = Math.min(distance * 0.2, 50);

  // Calculate the perpendicular vector
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const perpX = -dy;
  const perpY = dx;
  // Normalize the perpendicular vector and apply offset
  const length = Math.sqrt(perpX * perpX + perpY * perpY) || 1;
  const controlX = midX + (perpX / length) * curveOffset;
  const controlY = midY + (perpY / length) * curveOffset;
  // Update control point
  path.path[1][1] = controlX;
  path.path[1][2] = controlY;
};

export const updateConnectedLines = (
  group: fabric.Group,
  canvas: fabric.Canvas,
) => {
  const lines = canvas
    .getObjects()
    .filter((obj) => obj instanceof fabric.Path) as fabric.Path[];

  lines.forEach((line) => {
    const path = line as CustomPath;
    const start = {
      x: path.path[0][1] as number,
      y: path.path[0][2] as number,
    };
    const end = { x: path.path[1][3] as number, y: path.path[1][4] as number };

    // Get the group's connection points in absolute coordinates
    const groupCenter = group.getCenterPoint();
    const points = group
      .getObjects("circle")
      .map((point) => {
        if (point instanceof fabric.Circle) {
          return {
            x: groupCenter.x + (point.left || 0) * group.scaleX,
            y: groupCenter.y + (point.top || 0) * group.scaleY,
          };
        }
        return null;
      })
      .filter(Boolean);

    // Check if either end of the line is near any of the group's connection points
    points.forEach((point) => {
      if (!point) return;

      // Check start point
      const startDist = Math.sqrt(
        Math.pow(start.x - point.x, 2) + Math.pow(start.y - point.y, 2),
      );
      if (startDist < 20) {
        path.path[0][1] = point.x;
        path.path[0][2] = point.y;
      }

      // Check end point
      const endDist = Math.sqrt(
        Math.pow(end.x - point.x, 2) + Math.pow(end.y - point.y, 2),
      );
      if (endDist < 20) {
        path.path[1][3] = point.x;
        path.path[1][4] = point.y;
      }

      if (startDist < 20 || endDist < 20) {
        updateCurvature(path);
        path.setCoords();
      }
    });
  });

  canvas.requestRenderAll();
};
