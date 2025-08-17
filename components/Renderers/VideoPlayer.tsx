import { type SyntheticEvent, useEffect, useRef } from "react";

interface VideoPlayerProps {
  url: string;
}

// Global state to track if any video is in fullscreen
let isAnyVideoFullscreen = false;
const fullscreenListeners = new Set<() => void>();

const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const stopPropagation = (e: SyntheticEvent) => {
    // Prevent events from bubbling up to parent timeline navigation
    e.stopPropagation();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleFullscreenChange = () => {
      const isFullscreen = 
        document.fullscreenElement === video ||
        (document as any).webkitFullscreenElement === video ||
        (document as any).mozFullScreenElement === video ||
        (document as any).msFullscreenElement === video;
      
      isAnyVideoFullscreen = isFullscreen;
      
      // Notify all listeners about fullscreen state change
      fullscreenListeners.forEach(listener => listener());
      
      // Set a data attribute on the body to prevent hover interactions
      if (isFullscreen) {
        document.body.dataset.videoFullscreen = 'true';
      } else {
        delete document.body.dataset.videoFullscreen;
      }
    };

    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
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

// Export a function to check if any video is fullscreen
export const isVideoFullscreen = () => isAnyVideoFullscreen;

// Export a function to add listeners for fullscreen changes
export const addFullscreenListener = (listener: () => void) => {
  fullscreenListeners.add(listener);
  return () => fullscreenListeners.delete(listener);
};

export default VideoPlayer;
