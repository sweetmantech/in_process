import { useCollectionProvider } from "@/providers/CollectionProvider";
import { Address } from "viem";
import useInProcessGrantPermission from "./useInProcessGrantPermission";

// Grants PERMISSION_BIT_ADMIN to the smart wallet at the InProcess collection level (tokenId = 0).
const useGrantInProcessCollectionPermission = () => {
  const { data: collectionData } = useCollectionProvider();
  return useInProcessGrantPermission(collectionData?.address as Address | undefined, "0");
};

export default useGrantInProcessCollectionPermission;
