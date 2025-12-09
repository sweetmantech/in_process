import { RefObject } from "react";
import NoFileSelected from "@/components/MetadataCreation/NoFileSelected";
import MediaUploaded from "@/components/MetadataCreation/MediaUploaded";
import ResetButton from "@/components/MetadataCreation/ResetButton";
import { useOpenFileDialog } from "@/hooks/useOpenFileDialog";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

interface AnimationUploadProps {
  isOwner: boolean;
  isSaving: boolean;
}

const AnimationUpload = ({ isOwner, isSaving }: AnimationUploadProps) => {
  const { selectFile } = useMetadataUploadProvider();
  const { hasMedia, fileInputRef } = useMetadataFormProvider();
  const { openFileDialog } = useOpenFileDialog(fileInputRef, isOwner, isSaving);

  return (
    <div className="md:min-h-auto relative min-h-[400px] bg-[url('/grid.svg')] bg-contain md:aspect-[571/692]">
      <input
        ref={fileInputRef}
        id="media"
        type="file"
        className={`cursor-pointer ${hasMedia ? "hidden" : "z-2 absolute size-full opacity-0"}`}
        onChange={selectFile}
        disabled={!isOwner || isSaving}
      />
      {hasMedia ? (
        <>
          {isOwner && !isSaving && <ResetButton />}
          <MediaUploaded handleImageClick={openFileDialog} />
        </>
      ) : (
        <>
          {isOwner && !isSaving && hasMedia && <ResetButton />}
          <NoFileSelected />
        </>
      )}
    </div>
  );
};

export default AnimationUpload;
