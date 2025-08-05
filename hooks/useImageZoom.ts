import { useCallback } from 'react';

interface ImageZoomProps {
  previewUri: string;
  imageScale: number;
  setImageScale: (scale: number) => void;
}

export const useImageZoom = ({
  previewUri,
  imageScale,
  setImageScale,
}: ImageZoomProps) => {
  
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!previewUri) return;
    e.preventDefault();
    e.stopPropagation();
    
    const zoomSpeed = 0.1;
    const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
    const newScale = Math.max(0.5, Math.min(3, imageScale + delta));
    
    setImageScale(newScale);
  }, [previewUri, imageScale, setImageScale]);

  return {
    handleWheel,
  };
}; 