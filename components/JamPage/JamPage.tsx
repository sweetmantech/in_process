import { useEffect, useRef } from "react";
import * as fabric from "fabric";

const JamPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current);
      const text = new fabric.Textbox("Process", {
        fill: "#333333",
        width: 80,
        height: 80,
        fontSize: 16,
        textAlign: "center",
        originX: "center",
        originY: "center",
        maxWidth: 80,
        maxHeight: 80,
        fixedWidth: 80,
        fixedHeig: 80,
      });

      const rect = new fabric.Rect({
        fill: "#fef445",
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
      fabricCanvas.add(group);
      fabricCanvas.on("mouse:dblclick", function (options) {
        if (options.target && options.target.type === "group") {
          const group = options.target as fabric.Group;
          const textbox = group.item(1) as fabric.Textbox;
          if (textbox) {
            fabricCanvas.setActiveObject(textbox);
            textbox.enterEditing();
            textbox.selectAll();
          }
        }
      });
      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [canvasRef]);

  return (
    <div className="w-screen h-screen flex justify-center items-center pt-20">
      <canvas
        width="800"
        height="600"
        ref={canvasRef}
        className="border"
      ></canvas>
    </div>
  );
};

export default JamPage;
