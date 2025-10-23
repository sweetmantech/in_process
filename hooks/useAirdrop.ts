import { useCollectionProvider } from "@/providers/CollectionProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useState } from "react";
import { Address, isAddress } from "viem";
import { getPublicClient } from "@/lib/viem/publicClient";
import { useParams } from "next/navigation";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { toast } from "sonner";
import getPermission from "@/lib/zora/getPermission";
import { PERMISSION_BIT_ADMIN } from "@/lib/consts";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";

export interface AirdropItem {
  address: string;
  status: "validating" | "invalid" | "valid";
  ensName: string;
}
const useAirdrop = () => {
  const { collection } = useCollectionProvider();
  const [airdopToItems, setAirdropToItems] = useState<AirdropItem[]>([]);
  const { artistWallet, isPrepared } = useUserProvider();
  const { smartWallet } = useSmartWalletProvider();
  const [loading, setLoading] = useState<boolean>(false);
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
      if (!Boolean(artistWallet) || !smartWallet) return;
      setLoading(true);
      const smartWalletPermissionBit = await getPermission(
        collection.address,
        smartWallet as Address
      );
      if (smartWalletPermissionBit !== BigInt(PERMISSION_BIT_ADMIN)) {
        const accountPermissionBit = await getPermission(
          collection.address,
          artistWallet as Address
        );
        if (accountPermissionBit !== BigInt(PERMISSION_BIT_ADMIN))
          throw Error("The account does not have admin permission for this collection.");
        else throw Error("Admin permission are not yet granted to smart wallet.");
      }
      const airdrop = Array.from({ length: airdopToItems.length }).map((_, i) => ({
        address: airdopToItems[i].address,
        tokenId: params.tokenId,
      }));
      const response = await fetch("/api/moment/airdrop", {
        method: "POST",
        body: JSON.stringify({
          airdrop,
          account: artistWallet as Address,
          collection: collection.address,
        }),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await response.json();
      setLoading(false);
      toast.success("airdropped!");
      return data.hash;
    } catch (error) {
      toast.error((error as any)?.message);
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
