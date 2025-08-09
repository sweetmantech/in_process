import { useRef, useState, type SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

interface AudioPlayerProps {
  audioUrl: string;
  thumbnailUrl: string;
}
const AudioPlayer = ({ audioUrl, thumbnailUrl }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopPropagation = (e: SyntheticEvent) => {
    // Prevent events from bubbling up to parent timeline navigation
    e.stopPropagation();
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      const time = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value[0]);
    }
  };

  return (
    <div className="py-6 size-full flex-col flex items-center justify-center bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative w-full h-3/4">
        {thumbnailUrl && (
          <Image
            src={getFetchableUrl(thumbnailUrl) || ""}
            alt="Audio cover"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            unoptimized
          />
        )}
      </div>
      <div className="px-3 w-full">
        <audio ref={audioRef} src={audioUrl} onTimeUpdate={handleTimeUpdate} />
        <div className="text-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              stopPropagation(e);
              togglePlayPause();
            }}
            onMouseDown={stopPropagation}
            onPointerDown={stopPropagation}
            onTouchStart={stopPropagation}
            className="text-primary hover:text-primary-dark"
          >
            {isPlaying ? (
              <Pause className="size-6" />
            ) : (
              <Play className="size-6" />
            )}
          </Button>
        </div>
        <Slider
          value={[progress]}
          onValueChange={handleSliderChange}
          onClick={stopPropagation}
          onMouseDown={stopPropagation}
          onPointerDown={stopPropagation}
          onTouchStart={stopPropagation}
          max={100}
          step={1}
          className="w-full bg-black"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
