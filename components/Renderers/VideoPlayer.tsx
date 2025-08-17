import { type SyntheticEvent, useEffect, useRef } from "react";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const stopPropagation = (e: SyntheticEvent) => {
    // Prevent events from bubbling up to parent timeline navigation
    e.stopPropagation();
  };

  useEffect(() => {
    // Add a data attribute to help identify this as a video element
    const video = videoRef.current;
    if (!video) return;

    video.dataset.videoPlayer = 'true';

    return () => {
      if (video) {
        delete video.dataset.videoPlayer;
      }
    };
  }, []);

  return (
    <video 
      ref={videoRef}
      controls 
      className="w-full rounded-md bg-grey-moss-900"
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      onPointerDown={stopPropagation}
      onTouchStart={stopPropagation}
    >
      <source src={url} />
      Your browser does not support the video element.
    </video>
  );
};

export default VideoPlayer;
