import { Button } from "@/components/ui/button";
import { Pause, Play, ImageIcon } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import Image from "next/image";
import useIsCreateMode from "@/hooks/useIsCreateMode";

const AudioPlayer = ({ thumbnailUrl, audioUrl }: { thumbnailUrl?: string; audioUrl: string }) => {
  const {
    audioRef,
    isPlaying,
    progress,
    togglePlayPause,
    handleTimeUpdate,
    handleSliderChange,
    handleEnded,
  } = useAudioPlayer();
  const isCreateMode = useIsCreateMode();

  return (
    <div className="flex size-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white shadow-lg px-2">
      <div className="relative h-3/4 w-full">
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt="Audio cover"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            unoptimized
          />
        )}
        {isCreateMode && !thumbnailUrl && (
          <div className="flex size-full flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50/50 cursor-pointer">
            <ImageIcon className="mb-3 size-12 text-gray-400" strokeWidth={1.5} />
            <p className="text-sm font-medium text-gray-500">Upload thumbnail</p>
          </div>
        )}
      </div>
      <audio ref={audioRef} src={audioUrl} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />
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
  );
};

export default AudioPlayer;
