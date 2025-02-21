import * as fabric from "fabric";
import { CustomPath, Point } from "../../../types/fabric";
import { createLine } from "./createLine";
import { updateLineEndpoints, handleLineModified } from "./lineEvents";
import { findNearestConnectionPoint } from "./lineUtils";

const addLine = (canvas: fabric.Canvas | null) => {
  if (!canvas) return;
  let isDrawing = false;
  let line: CustomPath | null = null;
  let startPoint: Point = { x: 0, y: 0 };

  const handleMouseDown = (o: fabric.TPointerEventInfo<PointerEvent>) => {
    if (canvas.getActiveObject()) return;

    isDrawing = true;
    const pointer = canvas.getPointer(o.e);
    startPoint = { x: pointer.x, y: pointer.y };

    const snapPoint = findNearestConnectionPoint(canvas, startPoint);
    if (snapPoint) {
      startPoint = snapPoint;
    }

    line = createLine(canvas, startPoint);
    updateLineEndpoints(canvas, line, startPoint, startPoint);

    canvas.add(line);
    line.on("modified", () => line && handleLineModified(canvas, line));
    canvas.requestRenderAll();
  };

  const handleMouseMove = (o: fabric.TPointerEventInfo<PointerEvent>) => {
    if (!isDrawing || !line) return;

    const pointer = canvas.getPointer(o.e);
    const snapPoint = findNearestConnectionPoint(canvas, pointer);
    const endPoint = snapPoint || pointer;

    updateLineEndpoints(canvas, line, undefined, endPoint);
  };

  const handleMouseUp = () => {
    if (!isDrawing || !line) return;

    const end = { x: line.path[1][3] as number, y: line.path[1][4] as number };
    const snapPoint = findNearestConnectionPoint(canvas, end);

    updateLineEndpoints(canvas, line, undefined, snapPoint || end);
    isDrawing = false;
  };

  canvas.on("mouse:down", handleMouseDown);
  canvas.on("mouse:move", handleMouseMove);
  canvas.on("mouse:up", handleMouseUp);
};

export default addLine;
