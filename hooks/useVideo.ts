import { useEffect, useRef, useState, type SyntheticEvent } from "react";

const useVideo = (url?: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Snapshot on url change only: if the viewer was mid-playback (e.g. Mux URL refresh), keep
    // isPlaying so we show the loading overlay and resume in handleLoaded once the new src is ready.
    const preservePlayback = isPlaying && isLoaded;
    setIsLoaded(false);
    setIsError(false);
    if (!preservePlayback) {
      setIsPlaying(false);
    }
    videoRef.current?.pause();
    videoRef.current?.load();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run only when `url` changes; isPlaying/isLoaded are inputs for this transition snapshot
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
