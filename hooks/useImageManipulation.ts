import { useCallback } from 'react';
import { toast } from 'sonner';
import clientUploadToArweave from '@/lib/arweave/clientUploadToArweave';

interface ImageTransform {
  scale: number;
  offset: { x: number; y: number };
}

interface ImageManipulationProps {
  previewUri: string;
  previewSrc: string;
  imageScale: number;
  imageOffset: { x: number; y: number };
  setPreviewSrc: (src: string) => void;
  setPreviewUri: (uri: string) => void;
  setImageScale: (scale: number) => void;
  setImageOffset: (offset: { x: number; y: number }) => void;
  setIsUploading: (uploading: boolean) => void;
  setIsOpenPreviewUpload: (open: boolean) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const useImageManipulation = ({
  previewUri,
  previewSrc,
  imageScale,
  imageOffset,
  setPreviewSrc,
  setPreviewUri,
  setImageScale,
  setImageOffset,
  setIsUploading,
  setIsOpenPreviewUpload,
  containerRef,
}: ImageManipulationProps) => {
  
  const cropAndUploadImage = useCallback(async () => {
    if (!previewUri || (!imageOffset.x && !imageOffset.y && imageScale === 1)) {
      setIsOpenPreviewUpload(false);
      return;
    }

    try {
      setIsUploading(true);
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      const img = new window.Image();
      
      img.onload = async () => {
        const container = containerRef.current;
        if (!container) return;
        
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        
        const scaledWidth = img.width * imageScale;
        const scaledHeight = img.height * imageScale;
        
        const centerX = (containerWidth - scaledWidth) / 2;
        const centerY = (containerHeight - scaledHeight) / 2;
        
        const finalX = centerX + imageOffset.x;
        const finalY = centerY + imageOffset.y;
        
        canvas.width = containerWidth;
        canvas.height = containerHeight;
        
        ctx.drawImage(
          img,
          finalX, finalY,
          scaledWidth,
          scaledHeight
        );
        
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'cropped-preview.png', { type: 'image/png' });
            const newPreviewUri = await clientUploadToArweave(file);
            
            setPreviewSrc(URL.createObjectURL(blob));
            setPreviewUri(newPreviewUri);
            setImageScale(1);
            setImageOffset({ x: 0, y: 0 });
            
            setIsUploading(false);
            setIsOpenPreviewUpload(false);
          }
        }, 'image/png');
      };

      img.onerror = () => {
        setIsUploading(false);
        toast.error('Failed to load image for cropping');
      };

      if (previewSrc?.startsWith('blob:')) {
        img.src = previewSrc;
      } else {
        try {
          const response = await fetch(previewUri);
          const blob = await response.blob();
          img.src = URL.createObjectURL(blob);
        } catch (fetchError) {
          console.error('Failed to fetch image:', fetchError);
          setIsUploading(false);
          toast.error('Failed to load image for cropping');
        }
      }
      
    } catch (error) {
      console.error('Error cropping image:', error);
      setIsUploading(false);
      toast.error('Failed to crop image');
    }
  }, [previewUri, previewSrc, imageOffset, imageScale, setIsOpenPreviewUpload, setPreviewUri, setPreviewSrc, setImageScale, setImageOffset, containerRef, setIsUploading]);

  const getImageStyle = useCallback((isDragging: boolean) => {
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
  }, [imageOffset, imageScale]);

  return {
    cropAndUploadImage,
    getImageStyle,
  };
}; 