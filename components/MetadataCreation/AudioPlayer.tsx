import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { useRef, useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const AudioPlayer = ({ onClick }: { onClick: () => void }) => {
  const { createdContract } = useMomentCreateProvider();
  const { animationFile, previewFile } = useMomentFormProvider();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [previewFileUrl, setPreviewFileUrl] = useState<string>("");

  // Create blob URL from previewFile for cover image
  useEffect(() => {
    if (previewFile) {
      const blobUrl = URL.createObjectURL(previewFile);
      setPreviewFileUrl(blobUrl);
      return () => URL.revokeObjectURL(blobUrl);
    } else {
      setPreviewFileUrl("");
    }
  }, [previewFile]);

  // Create blob URL from animationFile
  const audioSrc = useMemo(() => {
    if (animationFile) {
      return URL.createObjectURL(animationFile);
    }
    return "";
  }, [animationFile]);

  // Clean up blob URL on unmount
  useEffect(() => {
    return () => {
      if (audioSrc && audioSrc.startsWith("blob:")) {
        URL.revokeObjectURL(audioSrc);
      }
    };
  }, [audioSrc]);

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
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
        <audio ref={audioRef} src={audioSrc} onTimeUpdate={handleTimeUpdate} />
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
