import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { Fragment } from "react";
import NoFileSelected from "./NoFileSelected";
import ResetButton from "./ResetButton";
import PreviewContainer from "./PreviewContainer";
import { useMomentMetadataProvider } from "@/providers/MomentMetadataProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const MetadataCreation = () => {
  const { selectFile } = useMomentMetadataProvider();
  const { createdContract } = useMomentCreateProvider();
  const { previewFile, animationFile, imageFile, fileInputRef } = useMetadataFormProvider();
  const selected = previewFile || animationFile || imageFile;
  const handleImageClick = () => fileInputRef.current?.click();

  return (
    <Fragment>
      <input
        ref={fileInputRef}
        id="media"
        type="file"
        className={`cursor-pointer ${selected ? "hidden" : "z-2 absolute size-full opacity-0"}`}
        onChange={selectFile}
        disabled={Boolean(createdContract)}
      />
      {selected ? (
        <>
          {!createdContract && <ResetButton />}
          <PreviewContainer handleImageClick={handleImageClick} />
        </>
      ) : (
        <NoFileSelected />
      )}
    </Fragment>
  );
};

export default MetadataCreation;
