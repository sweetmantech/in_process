"use client";

import useVideo from "@/hooks/useVideo";
import VideoPreview from "./VideoPreview";

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
}

const VideoPlayer = ({ url, thumbnail }: VideoPlayerProps) => {
  const { videoRef, isPlaying, isLoaded, stopPropagation, handlePlay, handleLoaded } =
    useVideo(url);

  if (!isPlaying) {
    return (
      <VideoPreview thumbnail={thumbnail} onPlay={handlePlay} onStopPropagation={stopPropagation} />
    );
  }

  return (
    <>
      {!isLoaded && (
        <VideoPreview
          thumbnail={thumbnail}
          onPlay={stopPropagation}
          onStopPropagation={stopPropagation}
          isLoading
        />
      )}
      <video
        ref={videoRef}
        controls
        className={`w-full rounded-md bg-grey-moss-900 ${!isLoaded ? "absolute inset-0 opacity-0" : ""}`}
        onClick={stopPropagation}
        onMouseDown={stopPropagation}
        onPointerDown={stopPropagation}
        onTouchStart={stopPropagation}
        onCanPlay={handleLoaded}
        key={url}
      >
        <source src={url} />
        Your browser does not support the video element.
      </video>
    </>
  );
};

export default VideoPlayer;
