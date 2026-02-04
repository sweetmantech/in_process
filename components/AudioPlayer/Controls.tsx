import { Pause, Play, Loader2 } from "lucide-react";
import { useAudioProvider } from ".";
import formatTime from "@/lib/audio/formatTime";

const Controls = () => {
  const { state, togglePlayPause, handleSliderChange } = useAudioProvider();
  const { isPlaying, isLoading, progress, bufferedProgress, currentTime, duration } = state;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    handleSliderChange([Math.max(0, Math.min(100, percent))]);
  };

  return (
    <div className="relative z-10 px-6 pb-6">
      {/* Progress bar */}
      <div className="mb-2">
        <div
          className="group relative h-1.5 w-full cursor-pointer rounded-full bg-green-950/50"
          onClick={handleProgressClick}
        >
          {/* Buffer progress */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-green-300/30 transition-all duration-150"
            style={{ width: `${bufferedProgress}%` }}
          />
          {/* Current progress */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-green-500 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
          {/* Thumb - appears on hover */}
          <div
            className="absolute top-1/2 size-3 -translate-y-1/2 scale-0 rounded-full bg-green-100 shadow-md transition-transform group-hover:scale-100"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>
      </div>

      {/* Time display */}
      <div className="mb-4 flex justify-between text-sm text-white/60">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Play button - centered, Spotify style */}
      <div className="flex items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause();
          }}
          disabled={isLoading && !isPlaying}
          className="flex size-14 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="size-7 animate-spin" />
          ) : isPlaying ? (
            <Pause className="size-7 fill-current" />
          ) : (
            <Play className="size-7 translate-x-0.5 fill-current" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Controls;
