import { useJamProvider } from "@/providers/JamProvider";
import { Plus, GitCommit } from "lucide-react";
import addStep from "@/lib/jam/addStep";
import addLine from "@/lib/jam/addLine";
import { useState } from "react";

const JamMedia = () => {
  const { canvasRef, canvas, containerRef } = useJamProvider();
  const [tool, setTool] = useState<"square" | "line">("square");

  const handleToolClick = (selectedTool: "square" | "line") => {
    if (!canvas) return;
    // Clean up existing event listeners
    canvas.off("mouse:down");
    canvas.off("mouse:move");
    canvas.off("mouse:up");
    setTool(selectedTool);
    if (selectedTool === "line") {
      addLine(canvas);
    }
    if (selectedTool === "square") {
      addStep(canvas, { width: 60, height: 50 });
    }
  };

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center">
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => handleToolClick("square")}
          className={`shadow-lg bg-white rounded-md p-1 ${tool === "square" ? "ring-2 ring-blue-500" : ""}`}
        >
          <Plus className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => handleToolClick("line")}
          className={`shadow-lg bg-white rounded-md p-1 ${tool === "line" ? "ring-2 ring-blue-500" : ""}`}
        >
          <GitCommit className="size-4" />
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-[300px] border-grey-700 border-[2px] rounded-md"
      ></canvas>
    </div>
  );
};

export default JamMedia;
