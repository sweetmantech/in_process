import { useState } from "react";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { useConnectWallet } from "@privy-io/react-auth";
import useConnectedWallet from "./useConnectedWallet";
import useSmartWallet from "./useSmartWallet";
import { useUserProvider } from "@/providers/UserProvider";
import { createWalletClient, custom, Address } from "viem";
import { CHAIN_ID, PERMISSION_BIT_ADMIN } from "@/lib/consts";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { getPublicClient } from "@/lib/viem/publicClient";
import { toast } from "sonner";
import { isUserRejection } from "@/lib/viem/isUserRejection";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

const useGrantCollectionPermission = () => {
  const { data: collectionData } = useCollectionProvider();
  const { artistWallet } = useUserProvider();
  const { smartWallet } = useSmartWallet();
  const { externalWallet } = useConnectedWallet();
  const [isGranting, setIsGranting] = useState(false);
  const { connectWallet } = useConnectWallet();

  const grantPermission = async () => {
    if (!collectionData?.address) {
      toast.error("Collection data not available");
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

    // If no external wallet, connect one
    if (!externalWallet) {
      connectWallet();
      return;
    }

    try {
      setIsGranting(true);

      // Switch to correct chain
      await externalWallet.switchChain(CHAIN_ID);

      // Get Ethereum provider
      const provider = await externalWallet.getEthereumProvider();
      const account = externalWallet.address as Address;

      // Create wallet client
      const client = createWalletClient({
        account,
        chain: getViemNetwork(CHAIN_ID),
        transport: custom(provider),
      });

      // Write the contract transaction to add permission at collection level (tokenId = 0)
      const hash = await client.writeContract({
        address: collectionData.address as Address,
        abi: zoraCreator1155ImplABI,
        functionName: "addPermission",
        args: [BigInt(0), smartWallet as Address, BigInt(PERMISSION_BIT_ADMIN)],
      });

      // Wait for transaction receipt
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

  return {
    grantPermission,
    isGranting,
  };
};

export default useGrantCollectionPermission;
