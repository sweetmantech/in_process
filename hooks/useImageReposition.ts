import { useState, useCallback } from "react";

interface ImagePosition {
  x: number;
  y: number;
}

interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  startImageX: number;
  startImageY: number;
}

export const useImageReposition = () => {
  const [position, setPosition] = useState<ImagePosition>({ x: 0, y: 0 });
  const [scale, setScale] = useState<number>(1);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    startImageX: 0,
    startImageY: 0,
  });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragState({
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startImageX: position.x,
      startImageY: position.y,
    });
  }, [position]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging) return;

    const deltaX = e.clientX - dragState.startX;
    const deltaY = e.clientY - dragState.startY;

    setPosition({
      x: dragState.startImageX + deltaX,
      y: dragState.startImageY + deltaY,
    });
  }, [dragState]);

  const handleMouseUp = useCallback(() => {
    setDragState(prev => ({ ...prev, isDragging: false }));
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 0.1;
    const delta = e.deltaY > 0 ? -zoomFactor : zoomFactor;
    const newScale = Math.max(0.5, Math.min(3, scale + delta));
    setScale(newScale);
  }, [scale]);

  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(3, prev + 0.2));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(0.5, prev - 0.2));
  }, []);

  const resetPosition = useCallback(() => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
  }, []);

  return {
    position,
    scale,
    isDragging: dragState.isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    zoomIn,
    zoomOut,
    resetPosition,
  };
}; 