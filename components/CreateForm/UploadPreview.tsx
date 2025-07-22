import { Fragment } from "react";
import { Label } from "../ui/label";
import WritingPreview from "./WritingPreview";
import { usePreviewActions } from "@/hooks/usePreviewActions";
import { PreviewActionButtons } from "./PreviewActionButtons";
import { PreviewInstructions } from "./PreviewInstructions";

const UploadPreview = () => {
  const {
    // State
    previewUri,
    previewSrc,
    writingText,
    isUploading,
    containerRef,
    imageScale,
    
    // Computed state
    imageStyle,
    
    // Actions
    handleMouseDown,
    handleWheel,
    handlePreviewUpload,
    cropAndUploadImage,
  } = usePreviewActions();

  return (
    <Fragment>
      <Label className="font-archivo-medium text-2xl text-center w-full">
        Preview
      </Label>
      
      <div 
        ref={containerRef}
        className="w-3/4 aspect-video relative border border-grey mt-2 font-spectral overflow-hidden"
      >
        {previewUri && !isUploading ? (
          <div 
            className="w-full h-full relative cursor-grab"
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
            style={imageStyle}
          >
            <img
              className="w-full h-full object-cover"
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
                  {isUploading ? "Processing..." : "No Preview."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
      
      <PreviewInstructions previewUri={previewUri} imageScale={imageScale} />
      
      <PreviewActionButtons
        isUploading={isUploading}
        onUploadClick={() => {}}
        onDoneClick={cropAndUploadImage}
        onFileChange={handlePreviewUpload}
      />
    </Fragment>
  );
};

export default UploadPreview;
