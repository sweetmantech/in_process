import { useCollectionProvider } from "@/providers/CollectionProvider";
import { Protocol } from "@/types/moment";
import useGrantInProcessCollectionPermission from "./useGrantInProcessCollectionPermission";
import useGrantSoundEditionPermission from "./useGrantSoundEditionPermission";
import useGrantCatalogCollectionPermission from "./useGrantCatalogCollectionPermission";

// Selects the correct grant-permission hook based on collection protocol.
// All hooks must always be called to comply with rules of hooks.
const useGrantCollectionPermissionByProtocol = () => {
  const { data } = useCollectionProvider();
  const inProcess = useGrantInProcessCollectionPermission();
  const soundXyz = useGrantSoundEditionPermission();
  const catalog = useGrantCatalogCollectionPermission();

  if (data?.protocol === Protocol.SoundXyz) return soundXyz;
  if (data?.protocol === Protocol.Catalog) return catalog;
  return inProcess;
};

export default useGrantCollectionPermissionByProtocol;
