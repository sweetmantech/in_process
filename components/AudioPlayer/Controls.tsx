import { Pause, Play, Loader2, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useAudioProvider } from ".";
import useAudioController from "@/hooks/useAudioController";
import formatTime from "@/lib/audio/formatTime";

const Controls = () => {
  const { state, togglePlayPause, handleReset, toggleMute } = useAudioProvider();
  const {
    isPlaying,
    isLoading,
    progress,
    bufferedProgress,
    currentTime,
    duration,
    volume,
    isMuted,
  } = state;

  const { handleProgressClick, handleProgressTouchMove, handleVolumeClick, handleVolumeTouchMove } =
    useAudioController();

  return (
    <div className="relative z-10 shrink-0 px-4 pb-4 sm:px-6 sm:pb-6">
      {/* Progress bar */}
      <div className="mb-2">
        <div
          className="group relative h-2 w-full cursor-pointer rounded-full bg-green-950/50 sm:h-1.5"
          onClick={handleProgressClick}
          onTouchMove={handleProgressTouchMove}
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
          {/* Thumb - always visible on mobile, hover on desktop */}
          <div
            className="absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-green-100 shadow-md transition-transform sm:size-3 sm:scale-0 sm:group-hover:scale-100"
            style={{ left: `calc(${progress}% - 8px)` }}
          />
        </div>
      </div>

      {/* Time display */}
      <div className="mb-3 flex justify-between text-xs text-white/60 sm:mb-4 sm:text-sm">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Control buttons */}
      <div className="flex items-center justify-center gap-4">
        {/* Reset button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          className="flex size-10 items-center justify-center rounded-full text-white/60 transition-all active:scale-95 sm:hover:text-white"
        >
          <RotateCcw className="size-5" />
        </button>

        {/* Play button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            togglePlayPause();
          }}
          disabled={isLoading && !isPlaying}
          className="flex size-12 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform active:scale-95 disabled:opacity-50 sm:size-14 sm:hover:scale-105"
        >
          {isLoading ? (
            <Loader2 className="size-6 animate-spin sm:size-7" />
          ) : isPlaying ? (
            <Pause className="size-6 fill-current sm:size-7" />
          ) : (
            <Play className="size-6 translate-x-0.5 fill-current sm:size-7" />
          )}
        </button>

        {/* Volume control */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="flex size-10 items-center justify-center text-white/60 transition-all active:scale-95 sm:hover:text-white"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="size-5" />
            ) : (
              <Volume2 className="size-5" />
            )}
          </button>

          {/* Volume slider - horizontal */}
          <div
            className="h-1.5 w-16 cursor-pointer rounded-full bg-green-950/50 sm:w-20"
            onClick={handleVolumeClick}
            onTouchMove={handleVolumeTouchMove}
          >
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{ width: `${isMuted ? 0 : volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
