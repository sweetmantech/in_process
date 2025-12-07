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
      <Label className="w-full text-center font-archivo-medium text-2xl">Preview</Label>
      <input
        type="file"
        className="hidden"
        ref={previewRef}
        accept="image/*"
        onChange={handlePreviewUpload}
      />
      <div className="relative mt-2 aspect-video w-3/4 overflow-hidden border border-grey font-spectral">
        {previewFile ? (
          <CropImage />
        ) : (
          <>
            {writingText ? (
              <WritingPreview />
            ) : (
              <div className="flex size-full items-center justify-center p-3">
                <p className="font-spectral text-3xl">No Preview.</p>
              </div>
            )}
          </>
        )}
      </div>
      <p className="font-spectral-italic">drag / zoom to resize</p>
      <button
        type="button"
        className="disabled:opacity-1 mt-2 w-3/4 transform rounded-sm border border-grey-moss-900 py-2 font-archivo transition-transform duration-150 hover:border-grey-moss-300 hover:bg-grey-moss-300 hover:text-grey-eggshell disabled:!pointer-events-auto disabled:!cursor-not-allowed"
        onClick={handleClick}
      >
        upload thumbnail
      </button>
      <button
        type="button"
        className="disabled:opacity-1 mt-2 w-3/4 transform rounded-sm bg-grey-moss-900 py-2 font-archivo text-grey-eggshell transition-transform duration-150 hover:border-grey-moss-300 hover:bg-grey-moss-300 disabled:!pointer-events-auto disabled:!cursor-not-allowed"
        onClick={handleDoneClick}
        disabled={isUploadingCrop}
      >
        {isUploadingCrop ? "saving..." : "done"}
      </button>
    </Fragment>
  );
};

export default UploadPreview;
