import { useCollectionProvider } from "@/providers/CollectionProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { Address } from "viem";

const useSmartWalletCollectionPermission = () => {
  const { smartWallet } = useSmartWalletProvider();
  const { data } = useCollectionProvider();

  const hasPermission = data && data?.admins.includes(smartWallet.toLowerCase() as Address);

  return hasPermission;
};

export default useSmartWalletCollectionPermission;
