import { useRef, useState } from "react";

/**
 * Hook to manage audio player state and controls.
 * Handles play/pause, progress tracking, and seeking functionality.
 */
export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Failed to play audio:", error);
          setIsPlaying(false);
        }
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime, duration } = audioRef.current;

      if (Number.isFinite(duration) && Number.isFinite(currentTime) && duration > 0) {
        const progress = (currentTime / duration) * 100;
        setProgress(Math.max(0, Math.min(100, progress)));
      } else {
        setProgress(0);
      }
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      const { duration } = audioRef.current;

      if (Number.isFinite(duration) && duration > 0) {
        const time = (value[0] / 100) * duration;
        const clampedTime = Math.max(0, Math.min(duration, time));
        audioRef.current.currentTime = clampedTime;
        setProgress(value[0]);
      } else {
        setProgress(0);
      }
    }
  };

  return {
    audioRef,
    isPlaying,
    progress,
    togglePlayPause,
    handleTimeUpdate,
    handleSliderChange,
  };
};
