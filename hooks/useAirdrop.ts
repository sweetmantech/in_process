import { useUserProvider } from "@/providers/UserProvider";
import { useState } from "react";
import { Address, isAddress } from "viem";
import { getPublicClient } from "@/lib/viem/publicClient";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { toast } from "sonner";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { usePrivy } from "@privy-io/react-auth";
import { executeAirdrop } from "@/lib/moment/executeAirdrop";
import { useMomentProvider } from "@/providers/MomentProvider";

export interface AirdropItem {
  address: string;
  status: "validating" | "invalid" | "valid";
  ensName: string;
}
const useAirdrop = () => {
  const { token } = useMomentProvider();
  const { tokenContractAddress: momentContract, tokenId } = token;
  const [airdopToItems, setAirdropToItems] = useState<AirdropItem[]>([]);
  const { artistWallet, isPrepared } = useUserProvider();
  const { smartWallet } = useSmartWalletProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const { getAccessToken } = usePrivy();

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
      if (!Boolean(artistWallet) || !smartWallet) return;
      setLoading(true);

      const accessToken = await getAccessToken();
      if (!accessToken) throw Error("No access token found");

      const hash = await executeAirdrop({
        airdropToItems: airdopToItems,
        tokenId,
        momentContract,
        smartWallet: smartWallet as Address,
        artistWallet: artistWallet as Address,
        accessToken,
      });

      setLoading(false);
      toast.success("airdropped!");
      return hash;
    } catch (error) {
      toast.error((error as any)?.message);
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
