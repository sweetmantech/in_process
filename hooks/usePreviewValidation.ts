import { useMemo } from 'react';

interface RawImageTransform {
  scale?: number;
  offset?: { x?: number; y?: number };
}

interface ValidatedImageTransform {
  scale: number;
  offset: { x: number; y: number };
}

export const usePreviewValidation = (rawTransform: RawImageTransform) => {
  const validatedTransform = useMemo((): ValidatedImageTransform => {
    // Ensure we have valid transformation values
    const safeScale = typeof rawTransform.scale === 'number' ? rawTransform.scale : 1;
    const safeOffset = rawTransform.offset && 
      typeof rawTransform.offset.x === 'number' && 
      typeof rawTransform.offset.y === 'number'
      ? { x: rawTransform.offset.x, y: rawTransform.offset.y }
      : { x: 0, y: 0 };
    
    return {
      scale: safeScale,
      offset: safeOffset,
    };
  }, [rawTransform.scale, rawTransform.offset]);

  return {
    validatedTransform,
  };
}; 