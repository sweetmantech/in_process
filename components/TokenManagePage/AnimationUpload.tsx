import NoFileSelected from "@/components/MetadataCreation/NoFileSelected";
import MediaUploaded from "@/components/MetadataCreation/MediaUploaded";
import ResetButton from "@/components/MetadataCreation/ResetButton";
import useUpdateMomentURI from "@/hooks/useUpdateMomentURI";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useRef } from "react";
import { useMomentMetadataProvider } from "@/providers/MomentMetadataProvider";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const AnimationUpload = () => {
  const { isOwner } = useMomentProvider();
  const { previewFile, imageFile, animationFile, resetForm } = useMomentFormProvider();
  const { selectFile } = useMomentMetadataProvider();
  const { isLoading: isSaving } = useUpdateMomentURI();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasMedia = Boolean(previewFile || imageFile || animationFile);

  const openFileDialog = () => {
    if (isOwner && !isSaving) {
      fileInputRef.current?.click();
    }
  };

  const handleReset = () => {
    resetForm();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div className="min-h-[400px] md:min-h-auto md:aspect-[571/692] relative bg-[url('/grid.svg')] bg-contain">
      <input
        ref={fileInputRef}
        id="media"
        type="file"
        className={`cursor-pointer ${hasMedia ? "hidden" : "z-2 size-full absolute opacity-0"}`}
        onChange={selectFile}
        disabled={!isOwner || isSaving}
      />
      {hasMedia ? (
        <>
          {isOwner && !isSaving && <ResetButton onClick={handleReset} />}
          <MediaUploaded handleImageClick={openFileDialog} />
        </>
      ) : (
        <NoFileSelected />
      )}
    </div>
  );
};

export default AnimationUpload;
