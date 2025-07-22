import { useCallback } from "react";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  startImageX: number;
  startImageY: number;
}

export const useSharedImageReposition = () => {
  const {
    imagePosition,
    setImagePosition,
    imageScale,
    setImageScale,
  } = useZoraCreateProvider();

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const dragState: DragState = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startImageX: imagePosition.x,
      startImageY: imagePosition.y,
    };

    // Store drag state in a closure for mouse move/up handlers
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.isDragging) return;

      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;

      setImagePosition({
        x: dragState.startImageX + deltaX,
        y: dragState.startImageY + deltaY,
      });
    };

    const handleMouseUp = () => {
      dragState.isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [imagePosition, setImagePosition]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    const delta = e.deltaY > 0 ? -zoomFactor : zoomFactor;
    const newScale = Math.max(0.5, Math.min(3, imageScale + delta));
    setImageScale(newScale);
  }, [imageScale, setImageScale]);

  const zoomIn = useCallback(() => {
    setImageScale(prev => Math.min(3, prev + 0.2));
  }, [setImageScale]);

  const zoomOut = useCallback(() => {
    setImageScale(prev => Math.max(0.5, prev - 0.2));
  }, [setImageScale]);

  const resetPosition = useCallback(() => {
    setImagePosition({ x: 0, y: 0 });
    setImageScale(1);
  }, [setImagePosition, setImageScale]);

  return {
    position: imagePosition,
    scale: imageScale,
    handleMouseDown,
    handleWheel,
    zoomIn,
    zoomOut,
    resetPosition,
  };
}; 