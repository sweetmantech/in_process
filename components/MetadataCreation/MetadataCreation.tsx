import { useMomentCreateProvider } from "@/providers/MomentCreateProvider";
import { Fragment, useRef } from "react";
import NoFileSelected from "./NoFileSelected";
import ResetButton from "./ResetButton";
import MediaUploaded from "./MediaUploaded";

const MetadataCreation = () => {
  const {
    imageUri,
    animationUri,
    mimeType,
    pctComplete,
    previewSrc,
    reset,
    fileUpload,
    fileUploading,
    createdContract,
  } = useMomentCreateProvider();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const selected = imageUri || animationUri || fileUploading;

  const handleImageClick = () => fileInputRef.current?.click();

  const handleReset = () => {
    reset();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Fragment>
      <input
        ref={fileInputRef}
        id="media"
        type="file"
        className={`cursor-pointer ${selected ? "hidden" : "z-2 size-full absolute opacity-0"}`}
        onChange={fileUpload}
        disabled={Boolean(createdContract)}
      />
      {selected ? (
        <>
          {!createdContract && (
            <ResetButton onClick={handleReset} disabled={fileUploading} />
          )}
          <MediaUploaded
            handleImageClick={handleImageClick}
            fileUploading={fileUploading}
            mimeType={mimeType}
            animationUri={animationUri}
            imageUri={imageUri}
            pctComplete={pctComplete}
            previewSrc={previewSrc}
          />
        </>
      ) : (
        <NoFileSelected />
      )}
    </Fragment>
  );
};

export default MetadataCreation;
