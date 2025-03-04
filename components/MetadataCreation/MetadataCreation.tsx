import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { useRef } from "react";
import NoFileSelected from "./NoFileSelected";
import ResetButton from "./ResetButton";
import MediaUploaded from "./MediaUploaded";

const MetadataCreation = () => {
  const {
    imageUri,
    animationUri,
    reset,
    textInputActive,
    fileUpload,
    error,
    fileUploading,
  } = useZoraCreateProvider();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selected = imageUri || animationUri || textInputActive || fileUploading;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="size-full relative overflow-hidden bg-[url('/sky.png')] bg-cover">
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
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default MetadataCreation;
