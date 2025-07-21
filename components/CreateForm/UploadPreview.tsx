import { Fragment, useEffect, useCallback } from "react";
import { ChangeEvent, useRef, useState } from "react";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import Image from "next/image";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { toast } from "sonner";
import WritingPreview from "./WritingPreview";
import { Label } from "../ui/label";

const UploadPreview = () => {
  const {
    previewUri,
    setPreviewUri,
    writingText,
    setIsOpenPreviewUpload,
    previewSrc,
    setPreviewSrc,
    imageScale,
    setImageScale,
    imageOffset,
    setImageOffset,
  } = useZoraCreateProvider();
  const [progress, setProgress] = useState<number>(0);
  const previewRef = useRef() as any;
  const [isUploading, setIsUploading] = useState<boolean>(false);
  
  // Drag state for image repositioning
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!previewRef.current) return;
    previewRef.current.click();
  };

  const handlePreviewUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const files = e.target.files;
    if (!files?.length) return;
    const file = files[0];
    if (!file.type.includes("image")) {
      toast.error("please, select only image file.");
      return;
    }
    const previewUri = await clientUploadToArweave(file, (value: number) =>
      setProgress(value),
    );
    setPreviewSrc(URL.createObjectURL(file));
    setPreviewUri(previewUri);
    setIsUploading(false);
  };

  // Handle mouse down for drag start
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!previewUri) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, [previewUri]);

  // Handle mouse move for dragging
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setImageOffset(prev => {
      const newOffset = {
        x: prev.x + deltaX,
        y: prev.y + deltaY
      };
      console.log('Dragging:', { deltaX, deltaY, newOffset });
      return newOffset;
    });
    
    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isDragging, dragStart, setImageOffset]);

  // Handle mouse up to end dragging
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle wheel for zooming
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!previewUri) return;
    e.preventDefault();
    e.stopPropagation();
    
    const zoomSpeed = 0.1;
    const delta = e.deltaY > 0 ? -zoomSpeed : zoomSpeed;
    const newScale = Math.max(0.5, Math.min(3, imageScale + delta));
    
    console.log('Zooming:', { currentScale: imageScale, newScale, delta });
    setImageScale(newScale);
  }, [previewUri, imageScale, setImageScale]);

  // Save transformations when done is clicked
  const handleDone = useCallback(async () => {
    if (!previewUri || (!imageOffset.x && !imageOffset.y && imageScale === 1)) {
      // No transformations applied, just close modal
      console.log('No transformations to save');
      setIsOpenPreviewUpload(false);
      return;
    }

    try {
      setIsUploading(true);
      console.log('Before closing modal - transformations:', { imageScale, imageOffset });
      
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
            
            console.log('Cropped image saved successfully');
          }
        }, 'image/png');
      };

      img.onerror = () => {
        setIsUploading(false);
        toast.error('Failed to load image for cropping');
      };

      // Load the image
      if (previewSrc && previewSrc.startsWith('blob:')) {
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
  }, [previewUri, previewSrc, imageOffset, imageScale, setIsOpenPreviewUpload, setPreviewUri, setPreviewSrc, setImageScale, setImageOffset]);

  // Add/remove global mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Convert offset and scale to CSS transform
  const getImageStyle = useCallback(() => {
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
  }, [imageOffset, imageScale, isDragging]);

  return (
    <Fragment>
      <Label className="font-archivo-medium text-2xl text-center w-full">
        Preview
      </Label>
      <input
        type="file"
        className="hidden"
        ref={previewRef}
        accept="image/*"
        onChange={handlePreviewUpload}
      />
      <div 
        ref={containerRef}
        className="w-3/4 aspect-video relative border border-grey mt-2 font-spectral overflow-hidden"
      >
        {previewUri && !isUploading ? (
          <div 
            className="w-full h-full relative cursor-grab"
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
            style={getImageStyle()}
          >
            <Image
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              src={previewSrc}
              alt="not found preview."
              draggable={false}
            />
          </div>
        ) : (
          <>
            {writingText && !isUploading ? (
              <WritingPreview />
            ) : (
              <div className="size-full p-3 flex justify-center items-center">
                <p className="font-spectral text-3xl">
                  {isUploading ? `${progress} %` : "No Preview."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      {previewUri && (
        <div className="text-center text-sm text-grey-moss-400 mt-1">
          <p className="font-spectral-italic">click and drag to reposition</p>
          <p className="font-spectral-italic">scroll to zoom ({(imageScale * 100).toFixed(0)}%)</p>
        </div>
      )}
      <button
        type="button"
        className="border border-grey-moss-900 w-3/4 mt-2 py-2 font-archivo rounded-sm 
        hover:border-grey-moss-300 hover:text-grey-eggshell hover:bg-grey-moss-300
        transform transition-transform duration-150 
        disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
        onClick={handleClick}
      >
        upload thumbnail
      </button>
      <button
        type="button"
        className="w-3/4 mt-2 py-2 font-archivo rounded-sm bg-grey-moss-900 text-grey-eggshell
        hover:border-grey-moss-300 hover:bg-grey-moss-300
        transform transition-transform duration-150 
        disabled:opacity-1 disabled:!cursor-not-allowed disabled:!pointer-events-auto"
        onClick={handleDone}
        disabled={isUploading}
      >
        {isUploading ? "cropping..." : "done"}
      </button>
    </Fragment>
  );
};

export default UploadPreview;
