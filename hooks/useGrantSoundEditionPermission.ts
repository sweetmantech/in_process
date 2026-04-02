import { useCollectionProvider } from "@/providers/CollectionProvider";
import { Address } from "viem";
import useSoundEditionGrantRoles from "./useSoundEditionGrantRoles";

// Grants ADMIN_ROLE to the smart wallet at the Sound.xyz edition (collection) level.
const useGrantSoundEditionPermission = () => {
  const { data: collectionData } = useCollectionProvider();
  return useSoundEditionGrantRoles(collectionData?.address as Address | undefined);
};

export default useGrantSoundEditionPermission;
