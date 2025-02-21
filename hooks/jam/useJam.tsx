import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

const useJam = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
        fabricCanvas.off();
      };
    }
  }, [canvasRef]);

  const updateCanvasSize = () => {
    if (canvas && canvasRef.current && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      canvasRef.current.width = containerWidth;
      canvasRef.current.height = 300;
      canvas.setDimensions({
        width: containerWidth,
        height: 300,
      });
      canvas.renderAll();
    }
  };

  useEffect(() => {
    if (canvas) {
      updateCanvasSize();
      const handleResize = () => {
        updateCanvasSize();
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
    // eslint-disable-next-line
  }, [canvas]);

  return {
    canvasRef,
    containerRef,
    canvas,
  };
};

export default useJam;
