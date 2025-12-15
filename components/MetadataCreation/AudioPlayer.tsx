import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

const AudioPlayer = ({ onClick }: { onClick: () => void }) => {
  const { createdTokenId } = useMomentCreateProvider();
  const { previewFileUrl, animationFileUrl } = useMetadataFormProvider();
  const { audioRef, isPlaying, progress, togglePlayPause, handleTimeUpdate, handleSliderChange } =
    useAudioPlayer();

  return (
    <div className="flex size-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white shadow-lg">
      <div className="relative h-3/4 w-full" onClick={onClick}>
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
            {!createdTokenId && (
              <div className="flex size-full items-center justify-center">
                <button className="rounded-md border border-gray-200 px-3 py-2 shadow-md">
                  Upload Audio Cover
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="w-full p-1">
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
