"use client";

import useVideo from "@/hooks/useVideo";
import getStreamingUrl from "@/lib/media/getStreamingUrl";
import VideoPreview from "./VideoPreview";

interface VideoPlayerProps {
  url: string;
  thumbnail?: string;
  variant?: "fill" | "natural";
}

const VideoPlayer = ({ url, thumbnail, variant = "fill" }: VideoPlayerProps) => {
  const {
    videoRef,
    isPlaying,
    isLoaded,
    isError,
    stopPropagation,
    handlePlay,
    handleLoaded,
    handleError,
  } = useVideo(url);

  if (!isPlaying) {
    return (
      <VideoPreview
        thumbnail={thumbnail}
        onPlay={handlePlay}
        onStopPropagation={stopPropagation}
        variant={variant}
      />
    );
  }

  return (
    <div className="flex size-full justify-center">
      {!isLoaded && (
        <VideoPreview
          thumbnail={thumbnail}
          onPlay={stopPropagation}
          onStopPropagation={stopPropagation}
          isLoading={!isError}
          isError={isError}
          variant={variant}
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
        onError={handleError}
        key={url}
      >
        <source src={getStreamingUrl(url)} />
        Your browser does not support the video element.
      </video>
    </div>
  );
};

export default VideoPlayer;
