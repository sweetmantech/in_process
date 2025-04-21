import { useTokensProvider } from "@/providers/TokensProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { useState } from "react";
import { Address, encodeFunctionData, isAddress } from "viem";
import useSignTransaction from "./useSignTransaction";
import useSignedAddress from "./useSignedAddress";
import { CHAIN } from "@/lib/consts";
import { getPublicClient } from "@/lib/viem/publicClient";
import { useParams } from "next/navigation";

const useAirdrop = () => {
  const { collection } = useTokensProvider();
  const [walletAddresses, setWalletAddresses] = useState<string[]>([""]);
  const { isPrepared } = useUserProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const { signTransaction } = useSignTransaction();
  const signedAddress = useSignedAddress();
  const params = useParams();

  const onChangeAddress = (value: string, i: number) => {
    const temp = [...walletAddresses];
    temp[i] = value;
    setWalletAddresses(temp);
  };

  const removeAddress = (i: number) => {
    if (walletAddresses.length === 1) {
      setWalletAddresses([""]);
      return;
    }
    const temp = [...walletAddresses];
    temp.splice(i, 1);
    setWalletAddresses(temp);
  };

  const onAirdrop = async () => {
    try {
      if (!isPrepared()) return;
      setLoading(true);
      const calls = [];
      for (let i = 0; i < walletAddresses.length; i++) {
        if (isAddress(walletAddresses[i])) {
          const callData = encodeFunctionData({
            abi: zoraCreator1155ImplABI,
            functionName: "adminMint",
            args: [
              walletAddresses[i] as Address,
              BigInt(params.tokenId as string),
              BigInt(1),
              "0x",
            ],
          });
          calls.push(callData);
        }
      }
      const hash = await signTransaction({
        account: signedAddress as Address,
        abi: zoraCreator1155ImplABI,
        functionName: "multicall",
        args: [calls],
        address: collection,
        value: BigInt(0),
        chain: CHAIN,
      });
      const publicClient: any = getPublicClient();
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      setLoading(false);
      return receipt;
    } catch (error) {
      console.log("ziad here", error);
      setLoading(false);
    }
  };

  return {
    walletAddresses,
    onChangeAddress,
    loading,
    onAirdrop,
    removeAddress,
  };
};

export default useAirdrop;
