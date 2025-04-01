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
    fileUpload,
    fileUploading,
    createdContract,
  } = useZoraCreateProvider();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selected = imageUri || animationUri || fileUploading;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };
  const handleReset = () => {
    reset();
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div
      className={`w-full md:max-w-[450px] xl:max-w-[500px] aspect-[576/700] relative bg-[url('/sky.png')] bg-cover ${createdContract && "pointer-events-none"}`}
    >
      <input
        ref={fileInputRef}
        id="media"
        type="file"
        className={selected ? "hidden" : "z-2 size-full absolute opacity-0"}
        onChange={fileUpload}
      />
      {selected ? (
        <>
          {!createdContract && <ResetButton onClick={handleReset} />}
          <MediaUploaded handleImageClick={handleImageClick} />
        </>
      ) : (
        <NoFileSelected />
      )}
    </div>
  );
};

export default MetadataCreation;
