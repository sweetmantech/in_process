import { useCallback } from 'react';

interface ImageTransform {
  scale: number;
  offset: { x: number; y: number };
}

interface ImageStyle {
  transform: string;
  transformOrigin: string;
  width: string;
  height: string;
  position: 'relative';
}

export const useImageTransform = () => {
  const getImageStyle = useCallback((transform: ImageTransform): ImageStyle => {
    const transforms = [];
    
    if (transform.scale !== 1) {
      transforms.push(`scale(${transform.scale})`);
    }
    
    if (transform.offset.x !== 0 || transform.offset.y !== 0) {
      transforms.push(`translate(${transform.offset.x}px, ${transform.offset.y}px)`);
    }
    
    return {
      transform: transforms.join(' '),
      transformOrigin: 'center',
      width: '100%',
      height: '100%',
      position: 'relative'
    };
  }, []);

  return {
    getImageStyle,
  };
}; 