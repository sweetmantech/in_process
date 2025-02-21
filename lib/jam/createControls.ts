import * as fabric from "fabric";
import { CustomPath, CustomControls } from "@/types/fabric";

const createControls = (canvas: fabric.Canvas): CustomControls => {
  const renderControl = (
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(left, top, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  };

  const updateCurvature = (path: CustomPath) => {
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

  return {
    start: new fabric.Control({
      x: 0,
      y: 0,
      offsetX: 0,
      offsetY: 0,
      cursorStyle: "pointer",
      mouseUpHandler: fabric.controlsUtils.dragHandler,
      positionHandler: function (dim, finalMatrix, fabricObject) {
        const path = fabricObject as CustomPath;
        // Return exact start point of line
        return new fabric.Point(
          path.path[0][1] as number,
          path.path[0][2] as number,
        );
      },
      render: renderControl,
      actionHandler: function (eventData, transform, x, y) {
        const path = transform.target as CustomPath;
        // Directly set coordinates
        path.path[0][1] = x;
        path.path[0][2] = y;
        updateCurvature(path);
        canvas.requestRenderAll();
        return true;
      },
    }),
    end: new fabric.Control({
      x: 0,
      y: 0,
      offsetX: 0,
      offsetY: 0,
      cursorStyle: "pointer",
      mouseUpHandler: fabric.controlsUtils.dragHandler,
      positionHandler: function (dim, finalMatrix, fabricObject) {
        const path = fabricObject as CustomPath;
        // Return exact end point of line
        return new fabric.Point(
          path.path[1][3] as number,
          path.path[1][4] as number,
        );
      },
      render: renderControl,
      actionHandler: function (eventData, transform, x, y) {
        const path = transform.target as CustomPath;
        // Directly set coordinates
        path.path[1][3] = x;
        path.path[1][4] = y;
        updateCurvature(path);
        canvas.requestRenderAll();
        return true;
      },
    }),
  };
};

export default createControls;
