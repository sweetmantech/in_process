import { useImageDrag } from './useImageDrag';
import { useImageCropping } from './useImageCropping';
import { useImageZoom } from './useImageZoom';
import { useImageUpload } from './useImageUpload';
import { usePreviewState } from './usePreviewState';

export const usePreviewActions = () => {
  const state = usePreviewState();

  // Initialize all action hooks with state
  const { isDragging, handleMouseDown } = useImageDrag({
    previewUri: state.previewUri,
    imageOffset: state.imageOffset,
    setImageOffset: state.setImageOffset,
  });

  const { handleWheel } = useImageZoom({
    previewUri: state.previewUri,
    imageScale: state.imageScale,
    setImageScale: state.setImageScale,
  });

  const { handlePreviewUpload } = useImageUpload({
    setPreviewSrc: state.setPreviewSrc,
    setPreviewUri: state.setPreviewUri,
    setIsUploading: state.setIsUploading,
  });

  const { cropAndUploadImage } = useImageCropping({
    previewUri: state.previewUri,
    previewSrc: state.previewSrc,
    imageScale: state.imageScale,
    imageOffset: state.imageOffset,
    containerRef: state.containerRef,
    setPreviewSrc: state.setPreviewSrc,
    setPreviewUri: state.setPreviewUri,
    setImageScale: state.setImageScale,
    setImageOffset: state.setImageOffset,
    setIsUploading: state.setIsUploading,
    setIsOpenPreviewUpload: state.setIsOpenPreviewUpload,
  });

  // Compute image style with current drag state
  const imageStyle = {
    ...state.imageStyle,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return {
    // State
    ...state,
    isDragging,
    
    // Computed state
    imageStyle,
    
    // Actions
    handleMouseDown,
    handleWheel,
    handlePreviewUpload,
    cropAndUploadImage,
  };
}; 