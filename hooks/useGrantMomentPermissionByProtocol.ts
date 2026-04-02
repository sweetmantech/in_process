import { useCollectionProvider } from "@/providers/CollectionProvider";
import { Protocol } from "@/types/moment";
import useGrantInProcessMomentPermission from "./useGrantInProcessMomentPermission";
import useGrantSoundTierPermission from "./useGrantSoundTierPermission";

// Selects the correct grant-permission hook based on collection protocol.
// Both hooks must always be called to comply with rules of hooks.
const useGrantMomentPermissionByProtocol = () => {
  const { data } = useCollectionProvider();
  const inProcess = useGrantInProcessMomentPermission();
  const soundXyz = useGrantSoundTierPermission();

  if (data?.protocol === Protocol.SoundXyz) return soundXyz;
  return inProcess;
};

export default useGrantMomentPermissionByProtocol;
