import { Fragment } from "react";
import WritingPreview from "./WritingPreview";
import { Label } from "../ui/label";
import { useCropImageProvider } from "@/providers/CropImageProvider";
import CropImage from "@/components/CropImage";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { useUploadPreview } from "@/hooks/useUploadPreview";

const UploadPreview = () => {
  const { writingText, previewFile } = useMomentFormProvider();
  const { isUploading: isUploadingCrop } = useCropImageProvider();
  const { previewRef, handleClick, handlePreviewUpload, handleDoneClick } = useUploadPreview();

  return (
    <Fragment>
      <Label className="font-archivo-medium text-2xl text-center w-full">Preview</Label>
      <input
        type="file"
        className="hidden"
        ref={previewRef}
        accept="image/*"
        onChange={handlePreviewUpload}
      />
      <div className="w-3/4 aspect-video relative border border-grey mt-2 font-spectral overflow-hidden">
        {previewFile ? (
          <CropImage />
        ) : (
          <>
            {writingText ? (
              <WritingPreview />
            ) : (
              <div className="size-full p-3 flex justify-center items-center">
                <p className="font-spectral text-3xl">No Preview.</p>
              </div>
            )}
          </>
        )}
      </div>
      <p className="font-spectral-italic">drag / zoom to resize</p>
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
        onClick={handleDoneClick}
        disabled={isUploadingCrop}
      >
        {isUploadingCrop ? "saving..." : "done"}
      </button>
    </Fragment>
  );
};

export default UploadPreview;
