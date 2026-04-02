import { useMomentProvider } from "@/providers/MomentProvider";
import { Address } from "viem";
import useCatalogGrantAuthScope from "./useCatalogGrantAuthScope";

// Grants AUTH_SCOPE_ARTIST to the smart wallet at the Catalog token (moment) level.
const useGrantCatalogTokenPermission = () => {
  const { moment } = useMomentProvider();
  return useCatalogGrantAuthScope(
    moment?.collectionAddress as Address | undefined,
    moment?.tokenId
  );
};

export default useGrantCatalogTokenPermission;
