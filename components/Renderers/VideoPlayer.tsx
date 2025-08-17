import { type SyntheticEvent, useRef } from "react";

interface VideoPlayerProps {
  url: string;
}
const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const stopPropagation = (e: SyntheticEvent) => {
    // Prevent events from bubbling up to parent timeline navigation
    e.stopPropagation();
  };

  return (
    <video 
      ref={videoRef}
      controls 
      className="w-full rounded-md bg-grey-moss-900"
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      onPointerDown={stopPropagation}
      onTouchStart={stopPropagation}
      data-video-hover-area
    >
      <source src={url} />
      Your browser does not support the video element.
    </video>
  );
};

export default VideoPlayer;
