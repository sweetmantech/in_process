import { useCallback, useEffect, useState } from 'react';

interface DragState {
  isDragging: boolean;
  dragStart: { x: number; y: number };
}

interface ImageDragProps {
  previewUri: string;
  imageOffset: { x: number; y: number };
  setImageOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}

export const useImageDrag = ({
  previewUri,
  imageOffset,
  setImageOffset,
}: ImageDragProps) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragStart: { x: 0, y: 0 },
  });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!previewUri) return;
    e.preventDefault();
    e.stopPropagation();
    setDragState({
      isDragging: true,
      dragStart: { x: e.clientX, y: e.clientY },
    });
  }, [previewUri]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragState.isDragging) return;
    
    const deltaX = e.clientX - dragState.dragStart.x;
    const deltaY = e.clientY - dragState.dragStart.y;
    
    setImageOffset((prev: { x: number; y: number }) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));
    
    setDragState(prev => ({
      ...prev,
      dragStart: { x: e.clientX, y: e.clientY },
    }));
  }, [dragState.isDragging, dragState.dragStart, setImageOffset]);

  const handleMouseUp = useCallback(() => {
    setDragState(prev => ({ ...prev, isDragging: false }));
  }, []);

  // Add/remove global mouse event listeners
  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  return {
    isDragging: dragState.isDragging,
    handleMouseDown,
  };
}; 