import { useMomentCreateProvider } from "@/providers/MomentCreateProviderWrapper/MomentCreateProvider";
import { Fragment, useRef } from "react";
import NoFileSelected from "./NoFileSelected";
import ResetButton from "./ResetButton";
import MediaUploaded from "./MediaUploaded";
import { useMomentMetadataProvider } from "@/providers/MomentCreateProviderWrapper/MomentMetadataProvider";
import { useMomentCreateFormProvider } from "@/providers/MomentCreateProviderWrapper/MomentCreateFormProvider";

const MetadataCreation = () => {
  const { fileUpload, fileUploading } = useMomentMetadataProvider();
  const { createdContract } = useMomentCreateProvider();
  const { imageUri, animationUri, resetForm } = useMomentCreateFormProvider();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selected = imageUri || animationUri || fileUploading;

  const handleImageClick = () => fileInputRef.current?.click();

  const handleReset = () => {
    resetForm();
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
          {!createdContract && <ResetButton onClick={handleReset} disabled={fileUploading} />}
          <MediaUploaded handleImageClick={handleImageClick} />
        </>
      ) : (
        <NoFileSelected />
      )}
    </Fragment>
  );
};

export default MetadataCreation;
