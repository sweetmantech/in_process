import React, { useRef } from "react";
import { useMomentManageProvider } from "@/providers/MomentManageProvider";
import { useTokenProvider } from "@/providers/TokenProvider";
import MediaUploaded from "@/components/MetadataCreation/MediaUploaded";
import ResetButton from "@/components/MetadataCreation/ResetButton";

const ImageUpload = () => {
  const { isOwner } = useTokenProvider();
  const { fileUpload, imageUri, fileUploading, mimeType, animationUri, pctComplete, previewSrc } =
    useMomentManageProvider();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageClick = () => {
    if (isOwner) {
      fileInputRef.current?.click();
    }
  };

  if (!imageUri) return null;

  return (
    <div>
      <label className="font-archivo text-sm text-grey-moss-600 block mb-1">image</label>
      <div className="min-h-[400px] md:min-h-auto md:aspect-[571/692] relative bg-[url('/grid.svg')] bg-contain">
        <input
          ref={fileInputRef}
          id="media"
          type="file"
          className={`cursor-pointer z-2 size-full absolute opacity-0`}
          onChange={fileUpload}
        />
        {isOwner && <ResetButton onClick={handleImageClick} disabled={fileUploading} />}
        <MediaUploaded
          handleImageClick={handleImageClick}
          fileUploading={fileUploading}
          mimeType={mimeType}
          animationUri={animationUri}
          imageUri={imageUri}
          pctComplete={pctComplete}
          previewSrc={previewSrc}
        />
      </div>
    </div>
  );
};

export default ImageUpload;
