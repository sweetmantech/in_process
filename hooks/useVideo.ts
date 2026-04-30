import { useEffect, useRef, useState, type SyntheticEvent } from "react";

const useVideo = (url?: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setIsLoaded(false);
    setIsError(false);
    videoRef.current?.pause();
    videoRef.current?.load();
  }, [url]);

  const stopPropagation = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const handlePlay = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
  };

  const handleLoaded = () => {
    setIsLoaded(true);
    const p = videoRef.current?.play();
    if (p) p.catch(() => {});
  };

  const handleError = () => {
    setIsError(true);
  };

  return {
    videoRef,
    isPlaying,
    isLoaded,
    isError,
    stopPropagation,
    handlePlay,
    handleLoaded,
    handleError,
  };
};

export default useVideo;
