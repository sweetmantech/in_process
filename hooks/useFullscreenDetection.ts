import { useState, useEffect } from "react";

/**
 * Hook to detect when ANY video element on the page is in fullscreen mode
 * This prevents hover state changes when videos are fullscreen
 */
const useFullscreenDetection = () => {
  const [isAnyVideoFullscreen, setIsAnyVideoFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      // Check if any video element is currently in fullscreen
      const fullscreenElement = document.fullscreenElement || 
                               (document as any).webkitFullscreenElement || 
                               (document as any).mozFullScreenElement || 
                               (document as any).msFullscreenElement;
      
      // Check if the fullscreen element is a video or contains a video
      const isVideoFullscreen = fullscreenElement && (
        fullscreenElement.tagName === 'VIDEO' || 
        fullscreenElement.querySelector('video')
      );
      
      setIsAnyVideoFullscreen(!!isVideoFullscreen);
    };

    // Listen for fullscreen change events across different browsers
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    // Initial check
    handleFullscreenChange();

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return { isAnyVideoFullscreen };
};

export default useFullscreenDetection;
