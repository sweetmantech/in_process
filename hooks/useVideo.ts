import { useRef, useState, type SyntheticEvent } from "react";

const useVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const stopPropagation = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  const handlePlay = (e: SyntheticEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
  };

  const handleLoaded = () => {
    setIsLoaded(true);
    videoRef.current?.play();
  };

  return { videoRef, isPlaying, isLoaded, stopPropagation, handlePlay, handleLoaded };
};

export default useVideo;
