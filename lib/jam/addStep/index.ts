import * as fabric from "fabric";
import getRandomHexColor from "../../getRandomHexColor";
import { updateConnectedLines } from "./updateLine";

// Add type for size parameters
interface StepOptions {
  width?: number;
  height?: number;
}

const addStep = (canvas: fabric.Canvas | null, options: StepOptions = {}) => {
  if (!canvas) return;

  // Use provided dimensions or defaults
  const width = options.width || 80;
  const height = options.height || 80;

  // Create the main text
  const text = new fabric.Textbox("Process", {
    fill: "#333333",
    width: width * 0.75, // Scale text box relative to new size
    height: height * 0.75,
    fontSize: 12,
    textAlign: "center",
    originX: "center",
    originY: "center",
  });

  // Create the rectangle
  const rect = new fabric.Rect({
    fill: getRandomHexColor(),
    width: width,
    height: height,
    strokeWidth: 1,
    stroke: "rgba(0,0,0,0.2)",
    rx: 5,
    ry: 5,
    originX: "center",
    originY: "center",
  });

  // Create connection points
  const createConnectionPoint = () =>
    new fabric.Circle({
      radius: 5,
      fill: "#ffffff",
      stroke: "#333333",
      strokeWidth: 2,
      originX: "center",
      originY: "center",
      selectable: false,
      hoverCursor: "default",
    });

  const topPoint = createConnectionPoint();
  const rightPoint = createConnectionPoint();
  const bottomPoint = createConnectionPoint();
  const leftPoint = createConnectionPoint();

  // Create the group with all elements
  const group = new fabric.Group(
    [rect, text, topPoint, rightPoint, bottomPoint, leftPoint],
    {
      left: 100,
      top: 100,
      originX: "center",
      originY: "center",
      hasControls: true,
      lockScalingFlip: true,
    },
  );

  // Position connection points after group creation
  const updateConnectionPoints = () => {
    if (!group) return;

    const width = group.width!;
    const height = group.height!;

    // Position points at the center of each edge
    topPoint.set({
      left: 0,
      top: -height / 2,
    });

    rightPoint.set({
      left: width / 2,
      top: 0,
    });

    bottomPoint.set({
      left: 0,
      top: height / 2,
    });

    leftPoint.set({
      left: -width / 2,
      top: 0,
    });

    group.setCoords();
    canvas.requestRenderAll();
  };

  // Initial positioning
  updateConnectionPoints();

  // Update points when group is modified
  group.on("modified", updateConnectionPoints);

  // Add handler for moving to update connected lines
  group.on("moving", () => {
    if (!canvas) return;
    updateConnectedLines(group, canvas);
  });

  canvas.add(group);
  canvas.requestRenderAll();
};

export default addStep;
