"use client";

import React from "react";

import type { ReactElement } from "react";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Upload,
  RotateCcw,
  Crop,
  Scissors,
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

interface ImageResizerProps {
  imageUrl?: string;
}

export default function ImageEditor({
  imageUrl,
}: ImageResizerProps): ReactElement {
  const { setIsEditingPreview, setPreviewUri } = useZoraCreateProvider();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<ImageDimensions>(
    { width: 0, height: 0 },
  );
  const [currentDimensions, setCurrentDimensions] = useState<ImageDimensions>({
    width: 0,
    height: 0,
  });
  const [scale, setScale] = useState<number>(100);
  const [cropMode, setCropMode] = useState<boolean>(false);
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
          setOriginalDimensions(dimensions);
          setTrulyOriginalDimensions(dimensions);
          setCurrentDimensions(dimensions);
          setScale(100);

          // Initialize crop area to full image
          setCropArea({ x: 0, y: 0, width: img.width, height: img.height });
          setCropMode(false);

          // Calculate display size (max 400px) - ensure it fits in container
          const maxDisplaySize = 400;
          let displayWidth = img.width;
          let displayHeight = img.height;

          // Always scale down if image is larger than max display size
          if (img.width > maxDisplaySize || img.height > maxDisplaySize) {
            const scale = Math.min(
              maxDisplaySize / img.width,
              maxDisplaySize / img.height,
            );
            displayWidth = img.width * scale;
            displayHeight = img.height * scale;
          }

          setImageDisplaySize({ width: displayWidth, height: displayHeight });
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
    if (imageUrl) {
      loadImageFromUrl(imageUrl);
    }
  }, [imageUrl, loadImageFromUrl]);

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
      // Initialize crop area to center 50% of image
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

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragState.isDragging || !cropContainerRef.current) return;

      const containerRect = cropContainerRef.current.getBoundingClientRect();
      const scaleX = originalDimensions.width / imageDisplaySize.width;
      const scaleY = originalDimensions.height / imageDisplaySize.height;

      // Calculate mouse position relative to the image container
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;

      const startMouseX = dragState.startX - containerRect.left;
      const startMouseY = dragState.startY - containerRect.top;

      const deltaX = (mouseX - startMouseX) * scaleX;
      const deltaY = (mouseY - startMouseY) * scaleY;

      setCropArea((prev) => {
        const newCrop = { ...prev };

        if (dragState.dragType === "move") {
          newCrop.x = Math.max(
            0,
            Math.min(prev.x + deltaX, originalDimensions.width - prev.width),
          );
          newCrop.y = Math.max(
            0,
            Math.min(prev.y + deltaY, originalDimensions.height - prev.height),
          );
        } else if (dragState.dragType === "resize" && dragState.resizeHandle) {
          const handle = dragState.resizeHandle;

          if (handle.includes("right")) {
            newCrop.width = Math.max(
              50,
              Math.min(prev.width + deltaX, originalDimensions.width - prev.x),
            );
          }
          if (handle.includes("left")) {
            const newWidth = Math.max(50, prev.width - deltaX);
            const newX = Math.max(0, prev.x + prev.width - newWidth);
            newCrop.x = newX;
            newCrop.width = newWidth;
          }
          if (handle.includes("bottom")) {
            newCrop.height = Math.max(
              50,
              Math.min(
                prev.height + deltaY,
                originalDimensions.height - prev.y,
              ),
            );
          }
          if (handle.includes("top")) {
            const newHeight = Math.max(50, prev.height - deltaY);
            const newY = Math.max(0, prev.y + prev.height - newHeight);
            newCrop.y = newY;
            newCrop.height = newHeight;
          }
        }

        return newCrop;
      });

      setDragState((prev) => ({
        ...prev,
        startX: e.clientX,
        startY: e.clientY,
      }));
    },
    [dragState, originalDimensions, imageDisplaySize],
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

  const applyCrop = useCallback(() => {
    if (!selectedImage) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = cropArea.width;
    canvas.height = cropArea.height;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(
        img,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height,
      );

      const croppedDataUrl = canvas.toDataURL();
      setSelectedImage(croppedDataUrl);
      setOriginalDimensions({ width: cropArea.width, height: cropArea.height });
      setCurrentDimensions({ width: cropArea.width, height: cropArea.height });
      setCropMode(false);
      setScale(100);

      // Update display size
      const maxDisplaySize = 400;
      let displayWidth = cropArea.width;
      let displayHeight = cropArea.height;

      if (cropArea.width > maxDisplaySize || cropArea.height > maxDisplaySize) {
        const scale = Math.min(
          maxDisplaySize / cropArea.width,
          maxDisplaySize / cropArea.height,
        );
        displayWidth = cropArea.width * scale;
        displayHeight = cropArea.height * scale;
      }

      setImageDisplaySize({ width: displayWidth, height: displayHeight });
    };
    img.src = selectedImage;
  }, [selectedImage, cropArea]);

  const resetToOriginal = useCallback(() => {
    if (
      !originalImage ||
      !trulyOriginalDimensions.width ||
      !trulyOriginalDimensions.height
    )
      return;

    // Restore original uncropped image
    setSelectedImage(originalImage);
    setOriginalDimensions(trulyOriginalDimensions);
    setCurrentDimensions(trulyOriginalDimensions);
    setScale(100);
    setCropMode(false);
    // Reset crop area to full image
    setCropArea({
      x: 0,
      y: 0,
      width: trulyOriginalDimensions.width,
      height: trulyOriginalDimensions.height,
    });

    // Recalculate display size for original image - ensure it fits in container
    const maxDisplaySize = 400;
    let displayWidth = trulyOriginalDimensions.width;
    let displayHeight = trulyOriginalDimensions.height;

    // Always scale down if image is larger than max display size
    if (
      trulyOriginalDimensions.width > maxDisplaySize ||
      trulyOriginalDimensions.height > maxDisplaySize
    ) {
      const scale = Math.min(
        maxDisplaySize / trulyOriginalDimensions.width,
        maxDisplaySize / trulyOriginalDimensions.height,
      );
      displayWidth = trulyOriginalDimensions.width * scale;
      displayHeight = trulyOriginalDimensions.height * scale;
    }

    setImageDisplaySize({ width: displayWidth, height: displayHeight });
  }, [originalImage, trulyOriginalDimensions]);

  React.useEffect(() => {
    if (dragState.isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [dragState.isDragging, handleMouseMove, handleMouseUp]);

  const downloadResizedImage = useCallback(() => {
    if (!selectedImage || !canvasRef.current) return;

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
          const file = new File([blob], "uploadedFile", { type: "image/png" });
          const uri = await clientUploadToArweave(file);
          setPreviewUri(uri);
          setIsUploading(false);
          setIsEditingPreview(false);
        }
      });
    };
    img.src = selectedImage;
    // eslint-disable-next-line
  }, [selectedImage, currentDimensions]);

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
  if (!imageUrl && !selectedImage) {
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
    <div className="px-2 space-y-6">
      {selectedImage && (
        <>
          {/* Image Preview */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="font-archivo">Original Image</Label>
              <div className="border rounded-lg p-4 bg-gray-50 relative overflow-hidden">
                <div
                  ref={cropContainerRef}
                  className="relative inline-block max-w-full"
                  style={{
                    width: `${imageDisplaySize.width}px`,
                    height: `${imageDisplaySize.height}px`,
                  }}
                >
                  {/* eslint-disable-next-line */}
                  <img
                    ref={imageRef}
                    src={selectedImage || "/placeholder.svg"}
                    alt="Original"
                    className="block w-full h-full object-contain"
                    draggable={false}
                  />

                  {/* Crop Overlay */}
                  {cropMode && (
                    <>
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none" />

                      {/* Crop selection */}
                      <div
                        className="absolute border-2 border-white shadow-lg cursor-move bg-transparent"
                        style={getCropStyle()}
                        onMouseDown={(e) => handleMouseDown(e, "move")}
                      >
                        {/* Resize handles with better positioning and event handling */}
                        <div
                          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-nw-resize z-10"
                          style={{ top: "-6px", left: "-6px" }}
                          onMouseDown={(e) =>
                            handleMouseDown(e, "resize", "top-left")
                          }
                        />
                        <div
                          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-n-resize z-10"
                          style={{
                            top: "-6px",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                          onMouseDown={(e) =>
                            handleMouseDown(e, "resize", "top")
                          }
                        />
                        <div
                          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-ne-resize z-10"
                          style={{ top: "-6px", right: "-6px" }}
                          onMouseDown={(e) =>
                            handleMouseDown(e, "resize", "top-right")
                          }
                        />
                        <div
                          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-e-resize z-10"
                          style={{
                            top: "50%",
                            right: "-6px",
                            transform: "translateY(-50%)",
                          }}
                          onMouseDown={(e) =>
                            handleMouseDown(e, "resize", "right")
                          }
                        />
                        <div
                          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-se-resize z-10"
                          style={{ bottom: "-6px", right: "-6px" }}
                          onMouseDown={(e) =>
                            handleMouseDown(e, "resize", "bottom-right")
                          }
                        />
                        <div
                          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-s-resize z-10"
                          style={{
                            bottom: "-6px",
                            left: "50%",
                            transform: "translateX(-50%)",
                          }}
                          onMouseDown={(e) =>
                            handleMouseDown(e, "resize", "bottom")
                          }
                        />
                        <div
                          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-sw-resize z-10"
                          style={{ bottom: "-6px", left: "-6px" }}
                          onMouseDown={(e) =>
                            handleMouseDown(e, "resize", "bottom-left")
                          }
                        />
                        <div
                          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-w-resize z-10"
                          style={{
                            top: "50%",
                            left: "-6px",
                            transform: "translateY(-50%)",
                          }}
                          onMouseDown={(e) =>
                            handleMouseDown(e, "resize", "left")
                          }
                        />
                      </div>
                    </>
                  )}
                </div>

                <p className="text-sm text-grey-moss-400 mt-2">
                  {originalDimensions.width} × {originalDimensions.height} px
                  {cropMode && (
                    <span className="ml-2 text-grey-moss-400">
                      | crop: {Math.round(cropArea.width)} ×{" "}
                      {Math.round(cropArea.height)} px
                    </span>
                  )}
                </p>

                {cropMode && (
                  <div className="mt-2 flex gap-2">
                    <Button
                      onClick={applyCrop}
                      size="sm"
                      className="flex items-center gap-2 font-archivo bg-grey-moss-900 text-grey-eggshell hover:bg-grey-moss-300"
                    >
                      <Scissors className="w-4 h-4" />
                      apply crop
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-archivo">Resized Preview</Label>
              <div className="border rounded-lg p-4 bg-gray-50">
                {/* eslint-disable-next-line */}
                <img
                  src={selectedImage || "/placeholder.svg"}
                  alt="Resized preview"
                  className="max-w-full h-auto rounded"
                  style={{
                    width: `${Math.min(currentDimensions.width, 300)}px`,
                    height: `${Math.min(currentDimensions.height, 300)}px`,
                    objectFit: "contain",
                  }}
                />
                <p className="text-sm text-gray-600 mt-2">
                  {currentDimensions.width} × {currentDimensions.height} px
                </p>
              </div>
            </div>
          </div>

          {/* Resize Controls */}
          <div className="space-y-4">
            {/* Scale Slider */}
            <div className="space-y-2">
              <Label className="font-archivo">Scale: {scale}%</Label>
              <Slider
                value={[scale]}
                onValueChange={handleScaleChange}
                min={10}
                max={300}
                step={1}
                className="w-full"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                disabled={isUploading}
                onClick={() => setIsEditingPreview(false)}
                size="sm"
                className="font-archivo flex items-center gap-2 bg-grey-moss-900 text-grey-eggshell border-none hover:bg-grey-moss-300 disabled:cursor-not-allowed disabled:bg-grey-moss-300"
              >
                <ChevronLeft className="w-4 h-4" />
                back
              </Button>
              <Button
                disabled={isUploading}
                onClick={resetToOriginal}
                size="sm"
                className="font-archivo flex items-center gap-2 bg-grey-moss-900 text-grey-eggshell border-none hover:bg-grey-moss-300 disabled:cursor-not-allowed disabled:bg-grey-moss-300"
              >
                <RotateCcw className="w-4 h-4" />
                reset
              </Button>
              <Button
                disabled={isUploading}
                onClick={toggleCropMode}
                variant={cropMode ? "default" : "outline"}
                size="sm"
                className="font-archivo flex items-center gap-2 bg-grey-moss-900 text-grey-eggshell border-none hover:bg-grey-moss-300 disabled:cursor-not-allowed disabled:bg-grey-moss-300"
              >
                <Crop className="w-4 h-4" />
                {cropMode ? "exit crop" : "crop"}
              </Button>
              <Button
                disabled={isUploading}
                onClick={downloadResizedImage}
                size="sm"
                className="font-archivo flex items-center gap-2 bg-grey-moss-900 text-grey-eggshell border-none hover:bg-grey-moss-300 disabled:cursor-not-allowed disabled:bg-grey-moss-300"
              >
                <Upload className="w-4 h-4" />
                done
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Hidden Canvas for Processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
