import { Button } from "@/components/ui/button";
import { Pause, Play, Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import Image from "next/image";
import ThumbnailUpload from "../MetadataCreation/ThumbnailUpload";
import { useMemo } from "react";
import { IN_PROCESS_API } from "@/lib/consts";

const AudioPlayer = ({ thumbnailUrl, audioUrl }: { thumbnailUrl?: string; audioUrl: string }) => {
  const streamingUrl = useMemo(() => {
    return `${IN_PROCESS_API}/audio/stream?url=${encodeURIComponent(audioUrl)}`;
  }, [audioUrl]);

  const {
    audioRef,
    isPlaying,
    isLoading,
    progress,
    bufferedProgress,
    togglePlayPause,
    handleTimeUpdate,
    handleSliderChange,
    handleEnded,
    handleCanPlay,
    handleWaiting,
    handlePlaying,
    handleProgress,
    handleLoadedMetadata,
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
      <audio
        ref={audioRef}
        src={streamingUrl}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onCanPlay={handleCanPlay}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onProgress={handleProgress}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <div className="text-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause();
          }}
          disabled={isLoading}
          className="text-primary hover:text-primary-dark"
        >
          {isLoading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : isPlaying ? (
            <Pause className="size-6" />
          ) : (
            <Play className="size-6" />
          )}
        </Button>
      </div>
      <div onClick={(e) => e.stopPropagation()} className="w-full">
        <div className="relative">
          <div
            className="absolute top-1/2 left-0 h-2 -translate-y-1/2 rounded-full bg-gray-300"
            style={{ width: `${bufferedProgress}%` }}
          />
          <Slider
            value={[progress]}
            onValueChange={handleSliderChange}
            max={100}
            step={1}
            className="relative w-full bg-black"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
