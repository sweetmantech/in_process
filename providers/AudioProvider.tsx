"use client";

import { createContext, useContext, ReactNode, Dispatch } from "react";
import { AudioPlayerState, AudioPlayerAction } from "@/types/audioPlayer";
import useAudio from "@/hooks/useAudio";

interface AudioContextValue {
  state: AudioPlayerState;
  dispatch: Dispatch<AudioPlayerAction>;
  audioSrc: string;
  setAudioSrc: (src: string) => void;
  togglePlayPause: () => Promise<void>;
  handleSliderChange: (value: number[]) => void;
  handleReset: () => void;
  handleVolumeChange: (value: number) => void;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextValue | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const {
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
    handleReset,
    handleVolumeChange,
    toggleMute,
  } = useAudio();

  return (
    <AudioContext.Provider
      value={{
        state,
        dispatch,
        audioSrc,
        setAudioSrc,
        togglePlayPause,
        handleSliderChange,
        handleReset,
        handleVolumeChange,
        toggleMute,
      }}
    >
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
          onProgress={handleProgress}
          onLoadedMetadata={handleLoadedMetadata}
        />
      )}
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioProvider() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudioProvider must be used within an AudioProvider");
  }
  return context;
}
