import * as fabric from "fabric";
import { CustomPath, Point } from "../../../types/fabric";
import createControls from "../createControls";

export const createLine = (
  canvas: fabric.Canvas,
  startPoint: Point,
): CustomPath => {
  const path = `M ${startPoint.x} ${startPoint.y} Q ${startPoint.x} ${startPoint.y} ${startPoint.x} ${startPoint.y}`;

  const line = new fabric.Path(path, {
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
  }) as CustomPath;

  // First remove all default controls
  line.controls = {};

  // Then set our custom controls
  line.controls = createControls(canvas);

  return line;
};
