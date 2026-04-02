import { useCollectionProvider } from "@/providers/CollectionProvider";
import { Address } from "viem";
import useCatalogGrantAuthScope from "./useCatalogGrantAuthScope";

// Grants AUTH_SCOPE_ARTIST to the smart wallet at the Catalog release (collection) level.
const useGrantCatalogCollectionPermission = () => {
  const { data: collectionData } = useCollectionProvider();
  return useCatalogGrantAuthScope(collectionData?.address as Address | undefined);
};

export default useGrantCatalogCollectionPermission;
