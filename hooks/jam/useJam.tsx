import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

const useJam = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current);
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

      setCanvas(fabricCanvas);
      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [canvasRef]);

  return {
    canvasRef,
    canvas,
  };
};

export default useJam;
