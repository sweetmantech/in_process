import NoFileSelected from "@/components/MetadataCreation/NoFileSelected";
import MediaUploaded from "@/components/MetadataCreation/MediaUploaded";
import ResetButton from "@/components/MetadataCreation/ResetButton";
import useUpdateMomentURI from "@/hooks/useUpdateMomentURI";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useMomentMetadataProvider } from "@/providers/MomentMetadataProvider";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { useOpenFileDialog } from "@/hooks/useOpenFileDialog";

const AnimationUpload = () => {
  const { isOwner } = useMomentProvider();
  const { previewFile, imageFile, animationFile, fileInputRef } = useMomentFormProvider();
  const { selectFile } = useMomentMetadataProvider();
  const { isLoading: isSaving } = useUpdateMomentURI();

  const hasMedia = Boolean(previewFile || imageFile || animationFile);
  const { openFileDialog } = useOpenFileDialog(fileInputRef, isOwner, isSaving);

  return (
    <div className="min-h-[400px] md:min-h-auto md:aspect-[571/692] relative bg-[url('/grid.svg')] bg-contain">
      <input
        ref={fileInputRef}
        id="media"
        type="file"
        className={`cursor-pointer ${hasMedia ? "hidden" : "z-2 size-full absolute opacity-0"}`}
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
