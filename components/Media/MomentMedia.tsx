import { useMomentProvider } from "@/providers/MomentProvider";
import useUpdateMomentURI from "@/hooks/useUpdateMomentURI";
import MediaSkeleton from "../TokenManagePage/MediaSkeleton";
import OwnerWarning from "../TokenManagePage/OwnerWarning";
import SaveMediaButton from "../TokenManagePage/SaveMediaButton";
import AnimationUpload from "../TokenManagePage/AnimationUpload";
import { Media } from "./Media";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const MomentMedia = () => {
  const { metadata, isOwner, isLoading } = useMomentProvider();
  const { hasMedia } = useMetadataFormProvider();
  const { isLoading: isSaving } = useUpdateMomentURI();

  return (
    <Media
      metadata={metadata}
      isOwner={isOwner}
      isLoading={isLoading}
      isSaving={isSaving}
      LoadingSkeleton={MediaSkeleton}
      SaveButton={SaveMediaButton}
      OwnerWarning={OwnerWarning}
      AnimationUpload={AnimationUpload}
      hasMedia={hasMedia}
    />
  );
};

export default MomentMedia;
