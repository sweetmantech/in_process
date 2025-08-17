import { type SyntheticEvent, useRef, useEffect } from "react";

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
    const video = videoRef.current;
    if (!video) return;

    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement === video;
      if (isFullscreen) {
        const hoverAreas = document.querySelectorAll('[data-video-hover-area]');
        hoverAreas.forEach((area) => {
          const feedElement = area.closest('[data-feed-button]');
          if (feedElement) {
            const mouseLeaveEvent = new MouseEvent('mouseleave', {
              bubbles: true,
              cancelable: true,
            });
            feedElement.dispatchEvent(mouseLeaveEvent);
          }
        });
      }
    };

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

export default VideoPlayer;
