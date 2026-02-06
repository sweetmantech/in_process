import { useEffect, useRef, useState, type SyntheticEvent } from "react";

const useVideo = (url?: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setIsLoaded(false);
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

  return { videoRef, isPlaying, isLoaded, stopPropagation, handlePlay, handleLoaded };
};

export default useVideo;
