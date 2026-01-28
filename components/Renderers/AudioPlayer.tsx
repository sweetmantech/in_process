import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import Image from "next/image";
import ThumbnailUpload from "../MetadataCreation/ThumbnailUpload";

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

  return (
    <div className="flex size-full flex-col items-center justify-center overflow-hidden rounded-lg bg-white shadow-lg px-2">
      <div className="relative h-3/4 w-full">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt="Audio cover"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            unoptimized
          />
        ) : (
          <ThumbnailUpload />
        )}
      </div>
      <audio ref={audioRef} src={audioUrl} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />
      <div className="text-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause();
          }}
          className="text-primary hover:text-primary-dark"
        >
          {isPlaying ? <Pause className="size-6" /> : <Play className="size-6" />}
        </Button>
      </div>
      <div onClick={(e) => e.stopPropagation()} className="w-full">
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
