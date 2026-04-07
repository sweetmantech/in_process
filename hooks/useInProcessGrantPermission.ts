import { useState } from "react";
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

// Core hook: grants PERMISSION_BIT_ADMIN to the smart wallet on an InProcess (Zora ERC1155) contract.
// - tokenId "0" → collection level
// - tokenId actual → moment level
const useInProcessGrantPermission = (
  contractAddress: Address | undefined,
  tokenId: string | undefined
) => {
  const { artistWallet } = useUserProvider();
  const { smartWallet } = useSmartWallet();
  const { externalWallet } = useConnectedWallet();
  const [isGranting, setIsGranting] = useState(false);
  const { connectWallet } = useConnectWallet();

  const grantPermission = async () => {
    if (!contractAddress || tokenId === undefined) {
      toast.error("Contract data not available");
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

      const hash = await client.writeContract({
        address: contractAddress,
        abi: zoraCreator1155ImplABI,
        functionName: "addPermission",
        args: [BigInt(tokenId), smartWallet as Address, BigInt(PERMISSION_BIT_ADMIN)],
      });

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

export default useInProcessGrantPermission;
