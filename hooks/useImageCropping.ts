import { useCallback } from 'react';
import { toast } from 'sonner';
import clientUploadToArweave from '@/lib/arweave/clientUploadToArweave';

interface ImageCroppingProps {
  previewUri: string;
  previewSrc: string;
  imageScale: number;
  imageOffset: { x: number; y: number };
  containerRef: React.RefObject<HTMLDivElement>;
  setPreviewSrc: (src: string) => void;
  setPreviewUri: (uri: string) => void;
  setImageScale: (scale: number) => void;
  setImageOffset: (offset: { x: number; y: number }) => void;
  setIsUploading: (uploading: boolean) => void;
  setIsOpenPreviewUpload: (open: boolean) => void;
}

export const useImageCropping = ({
  previewUri,
  previewSrc,
  imageScale,
  imageOffset,
  containerRef,
  setPreviewSrc,
  setPreviewUri,
  setImageScale,
  setImageOffset,
  setIsUploading,
  setIsOpenPreviewUpload,
}: ImageCroppingProps) => {
  
  const cropAndUploadImage = useCallback(async () => {
    if (!previewUri || (!imageOffset.x && !imageOffset.y && imageScale === 1)) {
      // No transformations applied, just close modal
      setIsOpenPreviewUpload(false);
      return;
    }

    try {
      setIsUploading(true);
      
      // Create canvas to crop the image
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Load the original image
      const img = new window.Image();
      
      img.onload = async () => {
        // Get container dimensions
        const container = containerRef.current;
        if (!container) return;
        
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;
        
        // Calculate the scaled image dimensions
        const scaledWidth = img.width * imageScale;
        const scaledHeight = img.height * imageScale;
        
        // Calculate the position to center the image and apply offset
        const centerX = (containerWidth - scaledWidth) / 2;
        const centerY = (containerHeight - scaledHeight) / 2;
        
        const finalX = centerX + imageOffset.x;
        const finalY = centerY + imageOffset.y;
        
        // Set canvas size to container size (this will be our crop area)
        canvas.width = containerWidth;
        canvas.height = containerHeight;
        
        // Draw the transformed image onto canvas
        ctx.drawImage(
          img,
          finalX, finalY,
          scaledWidth,
          scaledHeight
        );
        
        // Convert canvas to blob and upload
        canvas.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], 'cropped-preview.png', { type: 'image/png' });
            const newPreviewUri = await clientUploadToArweave(file);
            
            // Update the preview with the cropped image
            setPreviewSrc(URL.createObjectURL(blob));
            setPreviewUri(newPreviewUri);
            
            // Reset transformations since we've applied them to the image
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

      // Load the image
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
  }, [previewUri, previewSrc, imageOffset, imageScale, containerRef, setPreviewSrc, setPreviewUri, setImageScale, setImageOffset, setIsUploading, setIsOpenPreviewUpload]);

  return {
    cropAndUploadImage,
  };
}; 