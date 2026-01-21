import { useCollectionProvider } from "@/providers/CollectionProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { Address } from "viem";
import useIsCollectionOwner from "./useIsCollectionOwner";

const useCollectionLegacyWarning = () => {
  const { smartWallet } = useSmartWalletProvider();
  const { data } = useCollectionProvider();
  const isOwner = useIsCollectionOwner();

  const hasWarning =
    smartWallet && data && !data?.admins.includes(smartWallet.toLowerCase() as Address) && isOwner;

  return hasWarning;
};

export default useCollectionLegacyWarning;
