import { useCollectionProvider } from "@/providers/CollectionProvider";
import { Protocol } from "@/types/moment";
import useGrantInProcessMomentPermission from "./useGrantInProcessMomentPermission";
import useGrantSoundTierPermission from "./useGrantSoundTierPermission";
import useGrantCatalogTokenPermission from "./useGrantCatalogTokenPermission";

// Selects the correct grant-permission hook based on collection protocol.
// All hooks must always be called to comply with rules of hooks.
const useGrantMomentPermissionByProtocol = () => {
  const { data } = useCollectionProvider();
  const inProcess = useGrantInProcessMomentPermission();
  const soundXyz = useGrantSoundTierPermission();
  const catalog = useGrantCatalogTokenPermission();

  if (data?.protocol === Protocol.SoundXyz) return soundXyz;
  if (data?.protocol === Protocol.Catalog) return catalog;
  return inProcess;
};

export default useGrantMomentPermissionByProtocol;
