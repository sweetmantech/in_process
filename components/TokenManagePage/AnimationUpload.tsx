import NoFileSelected from "@/components/MetadataCreation/NoFileSelected";
import MediaUploaded from "@/components/MetadataCreation/MediaUploaded";
import ResetButton from "@/components/MetadataCreation/ResetButton";
import useUpdateMomentURI from "@/hooks/useUpdateMomentURI";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useMomentMetadataProvider } from "@/providers/MomentMetadataProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useOpenFileDialog } from "@/hooks/useOpenFileDialog";

const AnimationUpload = () => {
  const { isOwner } = useMomentProvider();
  const { hasMedia, fileInputRef } = useMetadataFormProvider();
  const { selectFile } = useMomentMetadataProvider();
  const { isLoading: isSaving } = useUpdateMomentURI();

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
