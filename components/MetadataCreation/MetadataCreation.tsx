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
    fileUpload,
    fileUploading,
    createModeActive,
    createdContract,
  } = useZoraCreateProvider();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selected =
    imageUri || animationUri || createModeActive || fileUploading;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`size-full relative bg-[url('/sky.png')] bg-cover ${createdContract && "pointer-events-none"}`}
    >
      {createModeActive ? (
        <TextInput />
      ) : (
        <>
          <input
            ref={fileInputRef}
            id="media"
            type="file"
            className={selected ? "hidden" : "size-full absolute opacity-0"}
            onChange={fileUpload}
          />
          {selected ? (
            <>
              {!createdContract && <ResetButton onClick={reset} />}
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
