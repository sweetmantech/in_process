import { useRef, useState, useCallback } from "react";

/**
 * Hook to manage audio player state and controls.
 * Handles play/pause, progress tracking, and seeking functionality.
 */
export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bufferedProgress, setBufferedProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          setIsLoading(true);
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Failed to play audio:", error);
          setIsPlaying(false);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleWaiting = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handlePlaying = useCallback(() => {
    setIsLoading(false);
    setIsPlaying(true);
  }, []);

  const handleProgress = useCallback(() => {
    if (audioRef.current) {
      const { buffered, duration } = audioRef.current;
      if (buffered.length > 0 && Number.isFinite(duration) && duration > 0) {
        const bufferedEnd = buffered.end(buffered.length - 1);
        setBufferedProgress((bufferedEnd / duration) * 100);
      }
    }
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const { currentTime: time, duration: dur } = audioRef.current;

      if (Number.isFinite(dur) && dur > 0) {
        setDuration(dur);
      }

      if (Number.isFinite(time)) {
        setCurrentTime(time);
      }

      if (Number.isFinite(dur) && Number.isFinite(time) && dur > 0) {
        const progress = (time / dur) * 100;
        setProgress(Math.max(0, Math.min(100, progress)));
      } else {
        setProgress(0);
      }
    }
  };

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      const { duration: dur } = audioRef.current;
      if (Number.isFinite(dur) && dur > 0) {
        setDuration(dur);
      }
    }
  }, []);

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

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return {
    audioRef,
    isPlaying,
    isLoading,
    progress,
    bufferedProgress,
    currentTime,
    duration,
    togglePlayPause,
    handleTimeUpdate,
    handleSliderChange,
    handleEnded,
    handleCanPlay,
    handleWaiting,
    handlePlaying,
    handleProgress,
    handleLoadedMetadata,
  };
};
