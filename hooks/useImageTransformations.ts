import { useState, useCallback } from "react";

interface ImageDimensions {
  width: number;
  height: number;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DragState {
  isDragging: boolean;
  dragType: "move" | "resize" | null;
  startX: number;
  startY: number;
  resizeHandle: string | null;
}

export const useImageTransformations = () => {
  const [originalDimensions, setOriginalDimensions] = useState<ImageDimensions>({ width: 0, height: 0 });
  const [currentDimensions, setCurrentDimensions] = useState<ImageDimensions>({ width: 0, height: 0 });
  const [scale, setScale] = useState<number>(100);
  const [cropMode, setCropMode] = useState<boolean>(false);
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragType: null,
    startX: 0,
    startY: 0,
    resizeHandle: null,
  });
  const [imageDisplaySize, setImageDisplaySize] = useState<ImageDimensions>({ width: 0, height: 0 });

  const handleScaleChange = useCallback(
    (value: number[]) => {
      const newScale = value[0];
      setScale(newScale);
      const width = Math.round((originalDimensions.width * newScale) / 100);
      const height = Math.round((originalDimensions.height * newScale) / 100);
      setCurrentDimensions({ width, height });
    },
    [originalDimensions],
  );

  const toggleCropMode = useCallback(() => {
    setCropMode(!cropMode);
    if (!cropMode) {
      const cropWidth = Math.round(originalDimensions.width * 0.3);
      const cropHeight = Math.round(originalDimensions.height * 0.3);
      const cropX = Math.round((originalDimensions.width - cropWidth) / 5);
      const cropY = Math.round((originalDimensions.height - cropHeight) / 5);
      setCropArea({ x: cropX, y: cropY, width: cropWidth, height: cropHeight });
    }
  }, [cropMode, originalDimensions]);

  const getCropStyle = useCallback(() => {
    if (!cropMode || !originalDimensions.width) return {};

    const scaleX = imageDisplaySize.width / originalDimensions.width;
    const scaleY = imageDisplaySize.height / originalDimensions.height;

    return {
      left: `${cropArea.x * scaleX}px`,
      top: `${cropArea.y * scaleY}px`,
      width: `${cropArea.width * scaleX}px`,
      height: `${cropArea.height * scaleY}px`,
    };
  }, [cropMode, cropArea, originalDimensions, imageDisplaySize]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, type: "move" | "resize", handle?: string) => {
      e.preventDefault();
      e.stopPropagation();
      setDragState({
        isDragging: true,
        dragType: type,
        startX: e.clientX,
        startY: e.clientY,
        resizeHandle: handle || null,
      });
    },
    [],
  );

  const resetTransformations = useCallback(() => {
    setScale(100);
    setCropMode(false);
    setCropArea({ x: 0, y: 0, width: 0, height: 0 });
    setDragState({
      isDragging: false,
      dragType: null,
      startX: 0,
      startY: 0,
      resizeHandle: null,
    });
  }, []);

  return {
    originalDimensions,
    setOriginalDimensions,
    currentDimensions,
    setCurrentDimensions,
    scale,
    setScale,
    cropMode,
    setCropMode,
    cropArea,
    setCropArea,
    dragState,
    setDragState,
    imageDisplaySize,
    setImageDisplaySize,
    handleScaleChange,
    toggleCropMode,
    getCropStyle,
    handleMouseDown,
    resetTransformations,
  };
}; 