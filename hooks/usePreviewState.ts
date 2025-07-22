import { useState, useRef, useCallback } from 'react';
import { useZoraCreateProvider } from '@/providers/ZoraCreateProvider';

interface PreviewState {
  // Global state from provider
  previewUri: string;
  previewSrc: string;
  imageScale: number;
  imageOffset: { x: number; y: number };
  writingText: string;
  
  // Local state
  isUploading: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  
  // Computed state
  imageStyle: {
    transform: string;
    cursor: string;
    transformOrigin: string;
  };
  
  // Actions
  setPreviewUri: (uri: string) => void;
  setPreviewSrc: (src: string) => void;
  setImageScale: (scale: number) => void;
  setImageOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  setIsUploading: (uploading: boolean) => void;
  setIsOpenPreviewUpload: (open: boolean) => void;
}

export const usePreviewState = (): PreviewState => {
  const {
    previewUri,
    setPreviewUri,
    previewSrc,
    setPreviewSrc,
    imageScale,
    setImageScale,
    imageOffset,
    setImageOffset,
    writingText,
    setIsOpenPreviewUpload,
  } = useZoraCreateProvider();

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Compute image style based on current state
  const computeImageStyle = useCallback((isDragging: boolean = false) => {
    const transforms = [];
    
    if (imageScale !== 1) {
      transforms.push(`scale(${imageScale})`);
    }
    
    if (imageOffset.x !== 0 || imageOffset.y !== 0) {
      transforms.push(`translate(${imageOffset.x}px, ${imageOffset.y}px)`);
    }
    
    return {
      transform: transforms.join(' '),
      cursor: isDragging ? 'grabbing' : 'grab',
      transformOrigin: 'center'
    };
  }, [imageScale, imageOffset]);

  return {
    // State
    previewUri,
    previewSrc,
    imageScale,
    imageOffset,
    writingText,
    isUploading,
    containerRef,
    
    // Computed state
    imageStyle: computeImageStyle(),
    
    // Actions
    setPreviewUri,
    setPreviewSrc,
    setImageScale,
    setImageOffset,
    setIsUploading,
    setIsOpenPreviewUpload,
  };
}; 