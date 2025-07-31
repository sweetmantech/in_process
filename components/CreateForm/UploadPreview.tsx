import { Fragment, useRef, useCallback } from "react";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import Image from "next/image";
import { toast } from "sonner";
import WritingPreview from "./WritingPreview";
import { Label } from "../ui/label";
import { useImageInteraction } from "@/hooks/useImageInteraction";
import { useFileUpload } from "@/hooks/useFileUpload";
import { ImageCropper } from "@/lib/image/imageCropper";

const UploadPreview = () => {
  const {
    previewUri,
    setPreviewUri,
    writingText,
    setIsOpenPreviewUpload,
    previewSrc,
    setPreviewSrc,
  } = useZoraCreateProvider();
  
  const previewRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    scale,
    position,
    isDragging,
    handleMouseDown,
    handleWheel,
    resetTransform,
  } = useImageInteraction({ containerRef });

  const {
    progress,
    isUploading,
    handleFileUpload,
  } = useFileUpload({
    setPreviewSrc,
    setPreviewUri,
  });

  const handleClick = useCallback(() => {
    if (!previewRef.current) return;
    previewRef.current.click();
  }, []);

  const handleCropAndClose = useCallback(async () => {
    // Apply crop if image has been zoomed or moved
    if (scale > 1 || position.x !== 0 || position.y !== 0) {
      try {
        const result = await ImageCropper.cropImage(previewSrc, position, scale);
        setPreviewSrc(result.croppedImageUrl);
        resetTransform();
      } catch (error) {
        toast.error("Failed to crop image.");
      }
    }
    setIsOpenPreviewUpload(false);
  }, [scale, position, previewSrc, setPreviewSrc, resetTransform, setIsOpenPreviewUpload]);

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
        onChange={handleFileUpload}
      />
      <div 
        ref={containerRef}
        className="w-3/4 aspect-video relative border border-grey mt-2 font-spectral overflow-hidden cursor-move"
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
      >
        {previewUri && !isUploading ? (
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            src={previewSrc}
            alt="not found preview."
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transition: isDragging ? "none" : "transform 0.1s ease-out",
            }}
            draggable={false}
          />
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
        onClick={handleCropAndClose}
      >
        done
      </button>
    </Fragment>
  );
};

export default UploadPreview;
