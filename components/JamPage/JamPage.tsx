import { useJamProvider } from "@/providers/JamProvider";
import BgNoiseWrapper from "../ui/texture-wrapper";
import { Plus, GitCommit } from "lucide-react";
import addStep from "@/lib/jam/addStep";
import addLine from "@/lib/jam/addLine";
import { useState } from "react";

const JamPage = () => {
  const { canvasRef, canvas } = useJamProvider();
  const [tool, setTool] = useState<"square" | "line">("square");

  const handleToolClick = (selectedTool: "square" | "line") => {
    setTool(selectedTool);
    if (selectedTool === "line") {
      addLine(canvas);
    }
    if (selectedTool === "square") {
      addStep(canvas);
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-gradientTopRightLight">
      <BgNoiseWrapper url="/egg-shell-noise.png">
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
          width="800"
          height="600"
          ref={canvasRef}
          className="border-grey-700 border-[2px] rounded-md"
        ></canvas>
      </BgNoiseWrapper>
    </main>
  );
};

export default JamPage;
