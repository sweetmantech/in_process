import { useJamProvider } from "@/providers/JamProvider";
import BgNoiseWrapper from "../ui/texture-wrapper";
import { Plus } from "lucide-react";
import addStep from "@/lib/jam/addStep";

const JamPage = () => {
  const { canvasRef, canvas } = useJamProvider();

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-gradientTopRightLight">
      <BgNoiseWrapper url="/egg-shell-noise.png">
        <button
          type="button"
          onClick={() => addStep(canvas)}
          className="shadow-lg bg-white rounded-md p-1"
        >
          <Plus className="size-4" />
        </button>
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
