import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useRef } from "react";
import NoFileSelected from "./NoFileSelected";
import ResetButton from "./ResetButton";
import MediaUploaded from "./MediaUploaded";
import TextInput from "./TextInput";

const MetadataCreation = () => {
  const {
    imageUri,
    animationUri,
    reset,
    textInputActive,
    fileUpload,
    fileUploading,
    createModeActive,
  } = useZoraCreateProvider();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selected = imageUri || animationUri || textInputActive || fileUploading;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="size-full relative bg-[url('/sky.png')] bg-cover">
      {createModeActive ? (
        <TextInput />
      ) : (
        <>
          <input
            ref={fileInputRef}
            id="media"
            type="file"
            className="hidden"
            onChange={fileUpload}
          />
          {selected ? (
            <>
              <ResetButton onClick={reset} />
              <MediaUploaded handleImageClick={handleImageClick} />
            </>
          ) : (
            <NoFileSelected onClick={handleImageClick} />
          )}
        </>
      )}
    </div>
  );
};

export default MetadataCreation;
