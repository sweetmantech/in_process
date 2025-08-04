"use client";

import React from "react";

import type { ReactElement } from "react";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Upload,
  RotateCcw,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";

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

export default function ImageEditor(): ReactElement {
  const { setIsEditingPreview, setPreviewUri, previewSrc, setPreviewSrc, setIsOpenPreviewUpload } =
    useZoraCreateProvider();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [currentDimensions, setCurrentDimensions] = useState<ImageDimensions>({
    width: 0,
    height: 0,
  });
  const [scale, setScale] = useState<number>(100);
  const [cropMode, setCropMode] = useState<boolean>(true);
  const [cropArea, setCropArea] = useState<CropArea>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    dragType: null,
    startX: 0,
    startY: 0,
    resizeHandle: null,
  });
  const [imageDisplaySize, setImageDisplaySize] = useState<ImageDimensions>({
    width: 0,
    height: 0,
  });
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [trulyOriginalDimensions, setTrulyOriginalDimensions] =
    useState<ImageDimensions>({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cropContainerRef = useRef<HTMLDivElement>(null);

  const loadImageFromUrl = useCallback(async (url: string) => {
    if (!url.trim()) {
      setError("No image URL provided");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Create a new image element to test if the URL is valid
      const img = new Image();

      // Set crossOrigin to handle CORS issues
      img.crossOrigin = "anonymous";

      img.onload = () => {
        // Convert image to canvas and then to data URL to avoid CORS issues
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setError("Failed to process image");
          setIsLoading(false);
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        try {
          const dataUrl = canvas.toDataURL();
          setSelectedImage(dataUrl);
          setOriginalImage(dataUrl);

          const dimensions = { width: img.width, height: img.height };
          setTrulyOriginalDimensions(dimensions);
          setCurrentDimensions(dimensions);
          setScale(100);

          // Calculate display size (max 480px) - ensure it fits in modal container
          const maxDisplaySize = 480;
          let displayWidth = img.width;
          let displayHeight = img.height;

          // Always scale to fit 480px width while maintaining aspect ratio
          if (img.width > maxDisplaySize || img.height > maxDisplaySize) {
            // Scale down if image is larger than max display size
            const scale = Math.min(
              maxDisplaySize / img.width,
              maxDisplaySize / img.height,
            );
            displayWidth = Math.round(img.width * scale);
            displayHeight = Math.round(img.height * scale);
          } else {
            // Scale up smaller images to 480px width
            const scale = maxDisplaySize / img.width;
            displayWidth = maxDisplaySize;
            displayHeight = Math.round(img.height * scale);
          }

          setImageDisplaySize({ width: displayWidth, height: displayHeight });
          
          // Initialize crop area to full display area (default crop mode)
          setCropArea({ x: 0, y: 0, width: displayWidth, height: displayHeight });
          setCropMode(true);

          setIsLoading(false);
        } catch (canvasError) {
          console.error(canvasError);
          setError(
            "Failed to process image. The image might be from a different domain.",
          );
          setIsLoading(false);
        }
      };

      img.onerror = () => {
        setError("Failed to load image. Please check the URL and try again.");
        setIsLoading(false);
      };

      img.src = url;
    } catch (err) {
      console.error(err);
      setError("Invalid image URL");
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (previewSrc) {
      loadImageFromUrl(previewSrc);
    }
  }, [previewSrc, loadImageFromUrl]);



  // Utility function to ensure crop area always matches imageDisplaySize
  const ensureCropAreaConsistency = useCallback((cropArea: CropArea): CropArea => {
    return {
      x: cropArea.x,
      y: cropArea.y,
      width: imageDisplaySize.width,
      height: imageDisplaySize.height,
    };
  }, [imageDisplaySize]);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      
      // Determine scroll direction and adjust scale
      const scrollDelta = e.deltaY;
      const scaleChange = scrollDelta > 0 ? -5 : 5; // Decrease scale on scroll down, increase on scroll up
      
      setScale((prevScale) => {
        const newScale = prevScale + scaleChange;
        const clampedScale = Math.max(100, Math.min(300, newScale));
        
        // Normalize crop area position when scale changes to prevent empty parts
        if (clampedScale !== prevScale) {
          const scaleRatio = clampedScale / prevScale;
          
          setCropArea((prevCropArea) => {
            // Calculate the scaled image dimensions
            const scaledImageWidth = imageDisplaySize.width * (clampedScale / 100);
            const scaledImageHeight = imageDisplaySize.height * (clampedScale / 100);
            
            // Calculate maximum allowed position to keep crop area within scaled image bounds
            const maxX = Math.max(0, scaledImageWidth - imageDisplaySize.width);
            const maxY = Math.max(0, scaledImageHeight - imageDisplaySize.height);
            
            // Adjust crop area position to maintain the same visual relationship
            const newX = Math.max(0, Math.min(
              prevCropArea.x * scaleRatio,
              maxX
            ));
            const newY = Math.max(0, Math.min(
              prevCropArea.y * scaleRatio,
              maxY
            ));
            
            return ensureCropAreaConsistency({
              x: newX,
              y: newY,
              width: imageDisplaySize.width,
              height: imageDisplaySize.height,
            });
          });
        }
        
        return clampedScale;
      });
    },
    [imageDisplaySize, ensureCropAreaConsistency],
  );

  const getCropStyle = useCallback(() => {
    if (!cropMode || !imageDisplaySize.width) return {};

    // Crop area should always match the imageDisplaySize (what user sees)
    // Position it at (0,0) since the image is transformed to show the correct portion
    return {
      left: '0px',
      top: '0px',
      width: `${imageDisplaySize.width}px`,
      height: `${imageDisplaySize.height}px`,
      borderColor: 'red', // Change border color to red
    };
  }, [cropMode, imageDisplaySize]);

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

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragState.isDragging || !cropContainerRef.current) return;

      const containerRect = cropContainerRef.current.getBoundingClientRect();

      // Calculate mouse position relative to the image container
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      const startMouseX = dragState.startX - containerRect.left;
      const startMouseY = dragState.startY - containerRect.top;

      // Calculate delta in display coordinates
      const deltaX = mouseX - startMouseX;
      const deltaY = mouseY - startMouseY;

      setCropArea((prev) => {
        const newCrop = { ...prev };
      
        if (dragState.dragType === "move") {
          // When image is scaled, allow crop area to move within the scaled image bounds
          // Calculate the effective scaled image size
          const scaledImageWidth = imageDisplaySize.width * (scale / 100);
          const scaledImageHeight = imageDisplaySize.height * (scale / 100);
          
          // Calculate maximum allowed position to keep crop area within scaled image bounds
          // The crop area should not move beyond the scaled image boundaries
          const maxX = Math.max(0, scaledImageWidth - imageDisplaySize.width);
          const maxY = Math.max(0, scaledImageHeight - imageDisplaySize.height);
          
          // Apply movement with strict boundary constraints
          // This ensures the crop area always stays within the scaled image bounds
          const newX = Math.max(0, Math.min(prev.x + deltaX, maxX));
          const newY = Math.max(0, Math.min(prev.y + deltaY, maxY));
          
          newCrop.x = newX;
          newCrop.y = newY;
          
          // Debug log to see the calculations
        } else if (dragState.dragType === "resize" && dragState.resizeHandle) {
          // Crop area should always match imageDisplaySize - no resizing allowed
          // Only allow movement within bounds
          const scaledImageWidth = imageDisplaySize.width * (scale / 100);
          const scaledImageHeight = imageDisplaySize.height * (scale / 100);
          
          const maxX = Math.max(0, scaledImageWidth - imageDisplaySize.width);
          const maxY = Math.max(0, scaledImageHeight - imageDisplaySize.height);
          
          newCrop.x = Math.max(0, Math.min(prev.x + deltaX, maxX));
          newCrop.y = Math.max(0, Math.min(prev.y + deltaY, maxY));
          
          // Always maintain imageDisplaySize dimensions
          newCrop.width = imageDisplaySize.width;
          newCrop.height = imageDisplaySize.height;
        }

        // Ensure crop area dimensions always match imageDisplaySize
        return ensureCropAreaConsistency(newCrop);
      });

      setDragState((prev) => ({
        ...prev,
        startX: e.clientX,
        startY: e.clientY,
      }));
    },
    [dragState.isDragging, dragState.dragType, dragState.startX, dragState.startY, dragState.resizeHandle, imageDisplaySize, scale, ensureCropAreaConsistency],
  );

  const handleMouseUp = useCallback(() => {

    setDragState({
      isDragging: false,
      dragType: null,
      startX: 0,
      startY: 0,
      resizeHandle: null,
    });
  }, []);



  const resetToOriginal = useCallback(() => {
    if (
      !originalImage ||
      !trulyOriginalDimensions.width ||
      !trulyOriginalDimensions.height
    )
      return;

    // Restore original uncropped image
    setSelectedImage(originalImage);
    setCurrentDimensions(trulyOriginalDimensions);
    setScale(100);
    setCropMode(true);

    // Recalculate display size for original image - ensure it fits in modal container
    const maxDisplaySize = 480;
    let displayWidth = trulyOriginalDimensions.width;
    let displayHeight = trulyOriginalDimensions.height;

    // Always scale to fit 480px width while maintaining aspect ratio
    if (
      trulyOriginalDimensions.width > maxDisplaySize ||
      trulyOriginalDimensions.height > maxDisplaySize
    ) {
      // Scale down if image is larger than max display size
      const scale = Math.min(
        maxDisplaySize / trulyOriginalDimensions.width,
        maxDisplaySize / trulyOriginalDimensions.height,
      );
      displayWidth = Math.round(trulyOriginalDimensions.width * scale);
      displayHeight = Math.round(trulyOriginalDimensions.height * scale);
    } else {
      // Scale up smaller images to 480px width
      const scale = maxDisplaySize / trulyOriginalDimensions.width;
      displayWidth = maxDisplaySize;
      displayHeight = Math.round(trulyOriginalDimensions.height * scale);
    }

    setImageDisplaySize({ width: displayWidth, height: displayHeight });
    
    // Reset crop area to full display area (not original dimensions)
    setCropArea({
      x: 0,
      y: 0,
      width: displayWidth,
      height: displayHeight,
    });
  }, [originalImage, trulyOriginalDimensions]);

  useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  const downloadResizedImage = useCallback((imageData?: string) => {
    const imageToUse = imageData || selectedImage;
    if (!imageToUse || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = currentDimensions.width;
    canvas.height = currentDimensions.height;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(
        img,
        0,
        0,
        currentDimensions.width,
        currentDimensions.height,
      );

      // Download the resized image
      canvas.toBlob(async (blob) => {
        if (blob) {
          setIsUploading(true);
          setUploadProgress(0);
          const file = new File([blob], "uploadedFile", { type: "image/png" });
          const uri = await clientUploadToArweave(file, (progress) => {
            setUploadProgress(progress);
          });
          setPreviewSrc(URL.createObjectURL(file));
          setPreviewUri(uri);
          setIsUploading(false);
          setUploadProgress(0);
          setIsEditingPreview(false);
          setIsOpenPreviewUpload(false);
        }
      });
    };
    img.src = imageToUse;
    // eslint-disable-next-line
  }, [selectedImage, currentDimensions]);

  const handleDoneClick = useCallback(async () => {
    // Check if any changes have been made (scale, crop, or position changes)
    const hasChanges = scale !== 100 || 
                      cropArea.x !== 0 || 
                      cropArea.y !== 0 || 
                      cropArea.width !== imageDisplaySize.width || 
                      cropArea.height !== imageDisplaySize.height;

    // If no changes have been made, just use the original image
    if (!hasChanges) {
      downloadResizedImage(selectedImage || undefined);
      return;
    }

    // Capture exactly what the user is seeing using current display variables
    const croppedImageData = await new Promise<string | null>((resolve) => {
      if (!selectedImage) {
        resolve(null);
        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }

      // Set canvas to the crop area size (what user actually sees and wants)
      canvas.width = cropArea.width;
      canvas.height = cropArea.height;

      const img = new Image();
      img.onload = () => {
        // Use the current display variables directly - no complex calculations needed
        // The crop area is already in the correct coordinate system for what the user sees
        
        // Simply draw the crop area as it's currently displayed
        // This captures exactly what the user sees without any coordinate transformations
        ctx.drawImage(
          img,
          cropArea.x,
          cropArea.y,
          cropArea.width,
          cropArea.height,
          0,
          0,
          cropArea.width,
          cropArea.height
        );

        const croppedDataUrl = canvas.toDataURL();
        
        // Update state for UI consistency
        setSelectedImage(croppedDataUrl);
        setCurrentDimensions({ width: cropArea.width, height: cropArea.height });
        setCropMode(true);
        setScale(100);
        setImageDisplaySize({ width: cropArea.width, height: cropArea.height });
        setCropArea({ x: 0, y: 0, width: cropArea.width, height: cropArea.height });
        
        // Return the cropped image data
        resolve(croppedDataUrl);
      };
      img.src = selectedImage;
    });

    // Now that cropping is complete, download the resized image with the cropped data
    if (croppedImageData) {
      downloadResizedImage(croppedImageData);
    }
  }, [selectedImage, cropArea, imageDisplaySize, scale, downloadResizedImage]);

  if (isLoading) {
    return (
      <div className="aspect-video w-full flex justify-center items-center gap-2 text-2xl font-spectral">
        <Loader2 className="w-5 h-5 animate-spin" />
        Loading image...
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Image Resizer
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-600 mb-2">Error loading image</p>
              <p className="text-sm text-gray-600">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show empty state if no image URL provided
  if (!previewSrc && !selectedImage) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Image Resizer
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center text-gray-600">
              <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No image URL provided</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full px-2 space-y-6">
      {selectedImage && (
        <>
          <div className="w-full space-y-2">
            <div className="flex flex-col items-center border rounded-lg p-4 bg-gray-50 relative overflow-hidden">
              <div
                ref={cropContainerRef}
                className="relative inline-block"
                style={{
                  width: `${imageDisplaySize.width}px`,
                  height: `${imageDisplaySize.height}px`,
                  overflow: 'hidden',
                }}
                onWheel={handleWheel}
              >
                {/* eslint-disable-next-line */}
                <img
                  ref={imageRef}
                  src={selectedImage || "/placeholder.svg"}
                  alt="Original"
                  className="block"
                  style={{
                    width: `${imageDisplaySize.width}px`,
                    height: `${imageDisplaySize.height}px`,
                    transform: `translate(${Math.max(-imageDisplaySize.width * (scale / 100 - 1), -cropArea.x * (scale / 100))}px, ${Math.max(-imageDisplaySize.height * (scale / 100 - 1), -cropArea.y * (scale / 100))}px) scale(${scale / 100})`,
                    transformOrigin: '0 0',
                    objectFit: 'contain',
                    maxWidth: 'none',
                    maxHeight: 'none',
                    minWidth: 'auto',
                    minHeight: 'auto',
                  }}
                  draggable={false}
                />

                {/* Crop Overlay */}
                {cropMode && (
                  <>
                    {/* Crop selection - fixed size matching imageDisplaySize */}
                    <div
                      className="absolute border-2 shadow-lg cursor-move bg-transparent"
                      style={getCropStyle()}
                      onMouseDown={(e) => handleMouseDown(e, "move")}
                    />
                  </>
                )}
              </div>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-center">
            <Button
              disabled={isUploading}
              onClick={() => {
                setIsEditingPreview(false);
                setIsOpenPreviewUpload(false);
              }}
              size="sm"
              className="font-archivo flex items-center gap-2 bg-grey-moss-900 text-grey-eggshell border-none hover:bg-grey-moss-300"
            >
              <ChevronLeft className="w-4 h-4" />
              back
            </Button>
            <Button
              disabled={isUploading}
              onClick={resetToOriginal}
              size="sm"
              className="font-archivo flex items-center gap-2 bg-grey-moss-900 text-grey-eggshell border-none hover:bg-grey-moss-300"
            >
              <RotateCcw className="w-4 h-4" />
              reset
            </Button>

            <Button
              disabled={isUploading}
              onClick={handleDoneClick}
              size="sm"
              className="font-archivo flex items-center gap-2 bg-grey-moss-900 text-grey-eggshell border-none hover:bg-grey-moss-300"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  done
                </>
              )}
            </Button>
          </div>

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="w-full mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Loader2 className="w-4 h-4 animate-spin text-grey-moss-400" />
                <span className="text-sm font-archivo text-grey-moss-400">
                  Uploading image... {uploadProgress}%
                </span>
              </div>
              <div className="w-full bg-grey-moss-100 rounded-full h-2">
                <div 
                  className="bg-grey-moss-900 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </>
      )}

      {/* Hidden Canvas for Processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
