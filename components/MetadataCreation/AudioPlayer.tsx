import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

const AudioPlayer = ({ onClick }: { onClick: () => void }) => {
  const { createdContract } = useMomentCreateProvider();
  const { previewFileUrl, animationFileUrl } = useMomentFormProvider();
  const { audioRef, isPlaying, progress, togglePlayPause, handleTimeUpdate, handleSliderChange } =
    useAudioPlayer();

  return (
    <div className="size-full bg-white rounded-lg shadow-lg overflow-hidden flex-col flex justify-center items-center">
      <div className="relative w-full h-3/4" onClick={onClick}>
        {previewFileUrl ? (
          <Image
            src={previewFileUrl}
            alt="Audio cover"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            unoptimized
          />
        ) : (
          <>
            {!createdContract && (
              <div className="size-full flex justify-center items-center">
                <button className="border border-gray-200 rounded-md px-3 py-2 shadow-md">
                  Upload Audio Cover
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="p-1 w-full">
        <audio ref={audioRef} src={animationFileUrl} onTimeUpdate={handleTimeUpdate} />
        <div className="text-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            className="text-primary hover:text-primary-dark"
          >
            {isPlaying ? <Pause className="size-6" /> : <Play className="size-6" />}
          </Button>
        </div>
        <Slider
          value={[progress]}
          onValueChange={handleSliderChange}
          max={100}
          step={1}
          className="w-full bg-black"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
