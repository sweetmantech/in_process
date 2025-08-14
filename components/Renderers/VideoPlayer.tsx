import { type SyntheticEvent } from "react";

interface VideoPlayerProps {
  url: string;
}
const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const stopPropagation = (e: SyntheticEvent) => {
    // Prevent events from bubbling up to parent timeline navigation
    e.stopPropagation();
  };

  return (
    <video 
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
