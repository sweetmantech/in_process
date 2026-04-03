import { useState } from "react";
import { useConnectWallet } from "@privy-io/react-auth";
import useConnectedWallet from "./useConnectedWallet";
import useSmartWallet from "./useSmartWallet";
import { useUserProvider } from "@/providers/UserProvider";
import { createWalletClient, custom, Address } from "viem";
import { CHAIN_ID, CATALOG_AUTH_SCOPE_OWNER, CATALOG_AUTH_SCOPE_ARTIST } from "@/lib/consts";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { getPublicClient } from "@/lib/viem/publicClient";
import { toast } from "sonner";
import { isUserRejection } from "@/lib/viem/isUserRejection";
import { catalogReleaseABI } from "@/lib/abis/catalogReleaseABI";

// Core hook: grants AUTH_SCOPE_ARTIST to the smart wallet on a Catalog release contract.
// - tokenId undefined → setContractAuthScope (collection level)
// - tokenId defined   → setTokenAuthScope (token level)
const useCatalogGrantAuthScope = (contractAddress: Address | undefined, tokenId?: string) => {
  const { artistWallet } = useUserProvider();
  const { smartWallet } = useSmartWallet();
  const { externalWallet } = useConnectedWallet();
  const [isGranting, setIsGranting] = useState(false);
  const { connectWallet } = useConnectWallet();

  const grantPermission = async () => {
    if (!contractAddress) {
      toast.error("Contract address not available");
      return;
    }

    if (!artistWallet) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!smartWallet) {
      toast.error("Smart wallet not available");
      return;
    }

    if (!externalWallet) {
      connectWallet();
      return;
    }

    try {
      setIsGranting(true);

      await externalWallet.switchChain(CHAIN_ID);

      const provider = await externalWallet.getEthereumProvider();
      const account = externalWallet.address as Address;

      const client = createWalletClient({
        account,
        chain: getViemNetwork(CHAIN_ID),
        transport: custom(provider),
      });

      const hash = await client.writeContract(
        tokenId !== undefined
          ? {
              address: contractAddress,
              abi: catalogReleaseABI,
              functionName: "setTokenAuthScope" as const,
              args: [BigInt(tokenId), smartWallet as Address, BigInt(CATALOG_AUTH_SCOPE_ARTIST)],
            }
          : {
              address: contractAddress,
              abi: catalogReleaseABI,
              functionName: "setContractAuthScope" as const,
              args: [
                smartWallet as Address,
                BigInt(CATALOG_AUTH_SCOPE_OWNER | CATALOG_AUTH_SCOPE_ARTIST),
              ],
            }
      );

      const publicClient = getPublicClient(CHAIN_ID);
      await publicClient.waitForTransactionReceipt({ hash });

      toast.success("Smart wallet permission granted successfully");
    } catch (error: any) {
      console.error("Grant permission error:", error);

      if (isUserRejection(error)) {
        toast.error("Transaction rejected");
      } else {
        toast.error(error?.message || "Failed to grant permission. Please try again.");
      }
    } finally {
      setIsGranting(false);
    }
  };

  return { grantPermission, isGranting };
};

export default useCatalogGrantAuthScope;
