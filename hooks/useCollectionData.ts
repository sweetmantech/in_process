import { getAddress } from "viem";
import { useMemo } from "react";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { useUserProvider } from "@/providers/UserProvider";

const useCollectionData = () => {
  const { data: collection } = useCollectionProvider();
  const { artistWallet } = useUserProvider();

  const isOwner = useMemo(() => {
    if (!collection || !artistWallet) return false;
    const defaultAdminAddress = collection.default_admin?.address;
    if (!defaultAdminAddress) return false;
    return getAddress(artistWallet) === getAddress(defaultAdminAddress);
  }, [collection, artistWallet]);

  return {
    isOwner,
    metadata: collection?.metadata ?? null,
    isLoading: !collection,
  };
};

export default useCollectionData;
