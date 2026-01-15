import { useMomentProvider } from "@/providers/MomentProvider";
import { useMomentUriUpdateProvider } from "@/providers/MomentUriUpdateProvider";
import SaveMediaButton from "../MomentManagePage/SaveMediaButton";
import { Media } from "./Media";

const MomentMedia = () => {
  const { metadata, isOwner, isLoading } = useMomentProvider();
  const { isLoading: isSaving } = useMomentUriUpdateProvider();

  return (
    <Media
      metadata={metadata}
      isOwner={isOwner}
      isLoading={isLoading}
      isSaving={isSaving}
      SaveButton={SaveMediaButton}
    />
  );
};

export default MomentMedia;
