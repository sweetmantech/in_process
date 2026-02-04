import { useReducer, useRef, useCallback, useState } from "react";
import audioPlayerReducer, { initialAudioPlayerState } from "@/lib/audio/audioPlayerReducer";

const useAudio = () => {
  const [state, dispatch] = useReducer(audioPlayerReducer, initialAudioPlayerState);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = useCallback(async () => {
    if (audioRef.current) {
      if (state.isPlaying) {
        audioRef.current.pause();
        dispatch({ type: "SET_PLAYING", payload: false });
      } else {
        try {
          dispatch({ type: "SET_LOADING", payload: true });
          await audioRef.current.play();
          dispatch({ type: "SET_PLAYING", payload: true });
        } catch (error) {
          console.error("Failed to play audio:", error);
          dispatch({ type: "SET_PLAYING", payload: false });
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      }
    }
  }, [state.isPlaying]);

  const handleCanPlay = useCallback(() => {
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  const handleWaiting = useCallback(() => {
    dispatch({ type: "SET_LOADING", payload: true });
  }, []);

  const handlePlaying = useCallback(() => {
    dispatch({ type: "SET_LOADING", payload: false });
    dispatch({ type: "SET_PLAYING", payload: true });
  }, []);

  const handleProgress = useCallback(() => {
    if (audioRef.current) {
      const { buffered, duration } = audioRef.current;
      if (!Number.isFinite(duration) || duration <= 0 || buffered.length === 0) {
        dispatch({ type: "SET_BUFFERED_PROGRESS", payload: 0 });
        return;
      }
      const bufferedEnd = buffered.end(buffered.length - 1);
      const pct = (bufferedEnd / duration) * 100;
      dispatch({ type: "SET_BUFFERED_PROGRESS", payload: Math.max(0, Math.min(100, pct)) });
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      const { currentTime: time, duration: dur } = audioRef.current;

      if (Number.isFinite(dur) && dur > 0) {
        dispatch({ type: "SET_DURATION", payload: dur });
      }

      if (Number.isFinite(time)) {
        dispatch({ type: "SET_CURRENT_TIME", payload: time });
      }

      if (Number.isFinite(dur) && Number.isFinite(time) && dur > 0) {
        const progress = (time / dur) * 100;
        dispatch({ type: "SET_PROGRESS", payload: Math.max(0, Math.min(100, progress)) });
      } else {
        dispatch({ type: "SET_PROGRESS", payload: 0 });
      }
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      const { duration: dur } = audioRef.current;
      if (Number.isFinite(dur) && dur > 0) {
        dispatch({ type: "SET_DURATION", payload: dur });
      }
    }
  }, []);

  const handleSliderChange = useCallback((value: number[]) => {
    if (audioRef.current) {
      const { duration } = audioRef.current;

      if (Number.isFinite(duration) && duration > 0) {
        const time = (value[0] / 100) * duration;
        const clampedTime = Math.max(0, Math.min(duration, time));
        audioRef.current.currentTime = clampedTime;
        dispatch({ type: "SET_PROGRESS", payload: value[0] });
      } else {
        dispatch({ type: "SET_PROGRESS", payload: 0 });
      }
    }
  }, []);

  const handleEnded = useCallback(() => {
    dispatch({ type: "SET_PLAYING", payload: false });
    dispatch({ type: "SET_PROGRESS", payload: 0 });
  }, []);

  return {
    state,
    dispatch,
    audioRef,
    audioSrc,
    setAudioSrc,
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

export default useAudio;
