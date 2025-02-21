import * as fabric from "fabric";
import createControls from "./createControls";
import { CustomPath, Point } from "../../types/fabric";

const addLine = (canvas: fabric.Canvas | null) => {
  if (!canvas) return;

  let isDrawing = false;
  let line: CustomPath | null = null;
  let startPoint: Point = { x: 0, y: 0 };

  // Function to find nearest connection point
  const findNearestConnectionPoint = (pointer: Point): Point | null => {
    let minDistance = Infinity;
    let nearestPoint: Point | null = null;

    // Get all groups (steps) from canvas
    const groups = canvas.getObjects("group");

    groups.forEach((group) => {
      if (group instanceof fabric.Group) {
        // Get connection points (circles) from the group
        const connectionPoints = group.getObjects("circle");

        connectionPoints.forEach((point) => {
          if (point instanceof fabric.Circle) {
            // Get absolute position of connection point
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

  // Function to update line endpoints and controls
  const updateLineEndpoints = (
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

    // Force control points to update their positions
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
    const curveOffset = Math.min(distance * 0.2, 50); // Cap the maximum offset

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

  canvas.on("mouse:down", (o) => {
    if (canvas.getActiveObject()) return;

    isDrawing = true;
    const pointer = canvas.getPointer(o.e);
    startPoint = { x: pointer.x, y: pointer.y };

    // Check for connection point snap on start
    const snapPoint = findNearestConnectionPoint(startPoint);
    if (snapPoint) {
      startPoint = snapPoint;
    }

    // Create a curved path instead of a straight line
    const path = `M ${startPoint.x} ${startPoint.y} Q ${startPoint.x} ${startPoint.y} ${startPoint.x} ${startPoint.y}`;
    line = new fabric.Path(path, {
      stroke: "#333333",
      strokeWidth: 2,
      fill: "",
      objectCaching: false,
      perPixelTargetFind: true,
      hasBorders: false,
      hasControls: true,
      cornerStyle: "circle",
      cornerSize: 10,
      transparentCorners: false,
      cornerColor: "#ffffff",
      cornerStrokeColor: "#333333",
      lockMovementX: true,
      lockMovementY: true,
      lockScalingX: true,
      lockScalingY: true,
      lockRotation: true,
      selectable: true,
      controls: createControls(canvas),
    }) as CustomPath;

    // Initialize path points
    updateLineEndpoints(line, startPoint, startPoint);

    // Remove all default controls
    const currentLine = line; // Create a non-null reference
    if (currentLine.controls) {
      Object.keys(currentLine.controls).forEach((key) => {
        if (key !== "start" && key !== "end") {
          delete currentLine.controls[key];
        }
      });
    }

    // Add line to canvas
    canvas.add(line);

    // Set up the modified event handler for the line
    line.on("modified", () => {
      if (line) {
        // Check for connection point snapping when line is modified
        const start = {
          x: line.path[0][1] as number,
          y: line.path[0][2] as number,
        };
        const end = {
          x: line.path[1][3] as number,
          y: line.path[1][4] as number,
        };

        const snapStart = findNearestConnectionPoint(start);
        const snapEnd = findNearestConnectionPoint(end);

        updateLineEndpoints(line, snapStart || start, snapEnd || end);
      }
    });

    canvas.requestRenderAll();
  });

  canvas.on("mouse:move", (o) => {
    if (!isDrawing || !line) return;

    const pointer = canvas.getPointer(o.e);

    // Check for connection point snap
    const snapPoint = findNearestConnectionPoint(pointer);
    const endPoint = snapPoint || pointer;

    // Update end point and controls
    updateLineEndpoints(line, undefined, endPoint);
  });

  canvas.on("mouse:up", () => {
    if (!isDrawing || !line) return;

    // Check for final connection point snap
    const end = { x: line.path[1][3] as number, y: line.path[1][4] as number };
    const snapPoint = findNearestConnectionPoint(end);

    // Update end point and controls one final time
    updateLineEndpoints(line, undefined, snapPoint || end);

    isDrawing = false;
  });
};

export default addLine;
