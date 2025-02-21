import * as fabric from "fabric";
import getRandomHexColor from "../getRandomHexColor";

const addStep = (canvas: fabric.Canvas | null) => {
  if (!canvas) return;
  const text = new fabric.Textbox("Process", {
    fill: "#333333",
    width: 80,
    height: 80,
    fontSize: 16,
    textAlign: "center",
    originX: "center",
    originY: "center",
  });

  const rect = new fabric.Rect({
    fill: getRandomHexColor(),
    width: 100,
    height: 100,
    strokeWidth: 1,
    stroke: "rgba(0,0,0,0.2)",
    rx: 5,
    ry: 5,
    originX: "center",
    originY: "center",
  });

  const group = new fabric.Group([rect, text], {
    left: 100,
    top: 100,
    originX: "center",
    originY: "center",
    hasControls: true,
    lockScalingFlip: true,
  });
  canvas.add(group);
};

export default addStep;
