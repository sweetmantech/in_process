import { useCollectionProvider } from "@/providers/CollectionProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { useState } from "react";
import { Address, encodeFunctionData, isAddress } from "viem";
import useSignTransaction from "./useSignTransaction";
import useSignedAddress from "./useSignedAddress";
import { getPublicClient } from "@/lib/viem/publicClient";
import { useParams } from "next/navigation";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import getViemNetwork from "@/lib/viem/getViemNetwork";

export interface AirdropItem {
  address: string;
  status: "validating" | "invalid" | "valid";
  ensName: string;
}
const useAirdrop = () => {
  const { collection } = useCollectionProvider();
  const [airdopToItems, setAirdropToItems] = useState<AirdropItem[]>([]);
  const { isPrepared } = useUserProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const { signTransaction } = useSignTransaction();
  const signedAddress = useSignedAddress();
  const params = useParams();

  const onChangeAddress = async (value: string) => {
    if (!value) return;
    setAirdropToItems((prev) => [
      ...prev,
      {
        address: isAddress(value) ? value : "",
        status: isAddress(value) ? "valid" : "validating",
        ensName: isAddress(value) ? "" : value,
      },
    ]);
    if (isAddress(value)) return;
    const publicClient = getPublicClient(mainnet.id);
    const ensAddress = await publicClient.getEnsAddress({
      name: normalize(value),
    });
    setAirdropToItems((prev) => [
      ...prev.slice(0, prev.length - 1),
      {
        address: ensAddress || "",
        status: ensAddress ? "valid" : "invalid",
        ensName: value,
      },
    ]);
  };

  const removeAddress = (i: number) => {
    const temp = [...airdopToItems];
    temp.splice(i, 1);
    setAirdropToItems(temp);
  };

  const onAirdrop = async () => {
    try {
      if (!isPrepared()) return;
      setLoading(true);
      const calls = [];
      for (let i = 0; i < airdopToItems.length; i++) {
        const callData = encodeFunctionData({
          abi: zoraCreator1155ImplABI,
          functionName: "adminMint",
          args: [
            airdopToItems[i].address as Address,
            BigInt(params.tokenId as string),
            BigInt(1),
            "0x",
          ],
        });
        calls.push(callData);
      }
      const hash = await signTransaction(
        {
          account: signedAddress as Address,
          abi: zoraCreator1155ImplABI,
          functionName: "multicall",
          args: [calls],
          address: collection.address,
          value: BigInt(0),
          chain: getViemNetwork(collection.chainId),
        },
        collection.chainId
      );
      const publicClient: any = getPublicClient(collection.chainId);
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      setLoading(false);
      return receipt;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return {
    airdopToItems,
    onChangeAddress,
    loading,
    onAirdrop,
    removeAddress,
  };
};

export default useAirdrop;
