import NoFileSelected from "@/components/MetadataCreation/NoFileSelected";
import MediaUploaded from "@/components/MetadataCreation/MediaUploaded";
import ResetButton from "@/components/MetadataCreation/ResetButton";
import useUpdateMomentURI from "@/hooks/useUpdateMomentURI";
import { useMomentManageProvider } from "@/providers/MomentManageProvider";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useRef } from "react";

const AnimationUpload = () => {
  const { isOwner } = useTokenProvider();
  const {
    imageUri,
    animationUri,
    mimeType,
    fileUpload,
    fileUploading,
    pctComplete,
    previewSrc,
    setImageUri,
    setAnimationUri,
  } = useMomentManageProvider();

  const { isLoading: isSaving } = useUpdateMomentURI();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasMedia = imageUri || animationUri || fileUploading;

  const openFileDialog = () => {
    if (isOwner && !isSaving) {
      fileInputRef.current?.click();
    }
  };

  const handleReset = () => {
    setImageUri("");
    setAnimationUri("");
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
        onChange={fileUpload}
        disabled={!isOwner || isSaving}
      />
      {hasMedia ? (
        <>
          {isOwner && !isSaving && <ResetButton onClick={handleReset} disabled={fileUploading} />}
          <MediaUploaded
            handleImageClick={openFileDialog}
            fileUploading={fileUploading}
            mimeType={mimeType || ""}
            animationUri={animationUri}
            imageUri={imageUri}
            pctComplete={pctComplete}
            previewSrc={previewSrc}
          />
        </>
      ) : (
        <NoFileSelected />
      )}
    </div>
  );
};

export default AnimationUpload;
