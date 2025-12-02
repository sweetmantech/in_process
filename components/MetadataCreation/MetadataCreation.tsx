import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { Fragment, useRef } from "react";
import NoFileSelected from "./NoFileSelected";
import ResetButton from "./ResetButton";
import PreviewContainer from "./PreviewContainer";
import { useMomentMetadataProvider } from "@/providers/MomentMetadataProvider";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const MetadataCreation = () => {
  const { selectFile } = useMomentMetadataProvider();
  const { createdContract } = useMomentCreateProvider();
  const { resetForm, previewFile, videoFile, animationFile, imageFile } = useMomentFormProvider();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selected = previewFile || videoFile || animationFile || imageFile;

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
        onChange={selectFile}
        disabled={Boolean(createdContract)}
      />
      {selected ? (
        <>
          {!createdContract && <ResetButton onClick={handleReset} />}
          <PreviewContainer handleImageClick={handleImageClick} />
        </>
      ) : (
        <NoFileSelected />
      )}
    </Fragment>
  );
};

export default MetadataCreation;
