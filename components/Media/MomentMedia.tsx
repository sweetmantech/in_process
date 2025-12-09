import { useMomentProvider } from "@/providers/MomentProvider";
import useUpdateMomentURI from "@/hooks/useUpdateMomentURI";
import OwnerWarning from "./OwnerWarning";
import SaveMediaButton from "../TokenManagePage/SaveMediaButton";
import { Media } from "./Media";

const MomentMedia = () => {
  const { metadata, isOwner, isLoading } = useMomentProvider();
  const { isLoading: isSaving } = useUpdateMomentURI();

  return (
    <Media
      metadata={metadata}
      isOwner={isOwner}
      isLoading={isLoading}
      isSaving={isSaving}
      SaveButton={SaveMediaButton}
      OwnerWarning={OwnerWarning}
    />
  );
};

export default MomentMedia;
