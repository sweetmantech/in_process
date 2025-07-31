import { useState, useCallback, useEffect, useRef } from 'react';
import type { Position } from '@/lib/image/imageCropper';
import { BoundaryCalculator } from '@/lib/image/boundaryCalculator';

interface UseImageInteractionProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

interface UseImageInteractionReturn {
  scale: number;
  position: Position;
  isDragging: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleWheel: (e: React.WheelEvent) => void;
  resetTransform: () => void;
}

export const useImageInteraction = ({ 
  containerRef 
}: UseImageInteractionProps): UseImageInteractionReturn => {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });

  const calculateCenteredPosition = useCallback((newScale: number): Position => {
    const container = containerRef.current;
    if (!container || newScale <= 1) {
      return { x: 0, y: 0 };
    }

    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    
    const scaledImageWidth = containerWidth * newScale;
    const scaledImageHeight = containerHeight * newScale;
    
    const extraWidth = scaledImageWidth - containerWidth;
    const extraHeight = scaledImageHeight - containerHeight;
    
    // Center the zoomed image - expand equally in all directions
    const centerX = -extraWidth / 2;
    const centerY = -extraHeight / 2;
    
    return { x: centerX, y: centerY };
  }, [containerRef]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale <= 1) return; // Only allow dragging when zoomed
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [position, scale]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const boundaries = BoundaryCalculator.calculateBoundaries(
      containerRect.width,
      containerRect.height,
      scale
    );
    
    const constrainedPosition = BoundaryCalculator.constrainPosition(
      { x: newX, y: newY },
      boundaries
    );
    
    setPosition(constrainedPosition);
  }, [isDragging, dragStart, scale, containerRef]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(1, Math.min(3, scale + delta));
    
    setScale(newScale);
    
    if (newScale > 1) {
      const centeredPosition = calculateCenteredPosition(newScale);
      setPosition(centeredPosition);
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }, [scale, calculateCenteredPosition]);

  const resetTransform = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Add mouse event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    scale,
    position,
    isDragging,
    handleMouseDown,
    handleWheel,
    resetTransform,
  };
}; 