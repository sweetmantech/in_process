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
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";

interface ImageDimensions {
  width: number;
  height: number;
}

export default function ImageEditor(): ReactElement {
  const { setIsEditingPreview, setPreviewUri, previewSrc, setPreviewSrc } =
    useZoraCreateProvider();
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
    if (previewSrc) {
      loadImageFromUrl(previewSrc);
    }
  }, [previewSrc, loadImageFromUrl]);

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
          setPreviewSrc(URL.createObjectURL(file));
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
              Image Editor
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
              Image Editor
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
                className="relative inline-block w-full"
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
                  className="block size-full object-contain"
                  draggable={false}
                />
              </div>

              <p className="text-sm text-grey-moss-400 mt-2">
                {currentDimensions.width} × {currentDimensions.height} px
              </p>
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
                onClick={downloadResizedImage}
                size="sm"
                className="font-archivo flex items-center gap-2 bg-grey-moss-900 text-grey-eggshell border-none hover:bg-grey-moss-300"
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
