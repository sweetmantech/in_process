import { useCollectionProvider } from "@/providers/CollectionProvider";
import { Protocol } from "@/types/moment";
import useGrantInProcessCollectionPermission from "./useGrantInProcessCollectionPermission";
import useGrantSoundEditionPermission from "./useGrantSoundEditionPermission";

// Selects the correct grant-permission hook based on collection protocol.
// Both hooks must always be called to comply with rules of hooks.
const useGrantCollectionPermissionByProtocol = () => {
  const { data } = useCollectionProvider();
  const inProcess = useGrantInProcessCollectionPermission();
  const soundXyz = useGrantSoundEditionPermission();

  if (data?.protocol === Protocol.SoundXyz) return soundXyz;
  return inProcess;
};

export default useGrantCollectionPermissionByProtocol;
