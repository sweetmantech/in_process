import { useUserProvider } from "@/providers/UserProvider";
import { useState } from "react";
import { Address, isAddress } from "viem";
import { toast } from "sonner";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { usePrivy } from "@privy-io/react-auth";
import { executeAirdrop } from "@/lib/moment/executeAirdrop";
import { useMomentProvider } from "@/providers/MomentProvider";
import { AirdropItem } from "@/types/airdrop";
import resolveAddressForAirdrop from "@/lib/ens/resolveAddressForAirdrop";

const useAirdrop = () => {
  const { moment } = useMomentProvider();
  const [airdropToItems, setAirdropToItems] = useState<AirdropItem[]>([]);
  const { artistWallet, isPrepared } = useUserProvider();
  const { smartWallet } = useSmartWalletProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const { getAccessToken } = usePrivy();

  const onChangeAddress = (value: string) => {
    if (!value) return;
    // Add item to list for UI feedback, but don't start async resolution
    // Resolution will happen on button click via onAirdrop
    setAirdropToItems((prev) => [
      ...prev,
      {
        address: isAddress(value) ? value : "",
        status: isAddress(value) ? "valid" : "validating",
        ensName: isAddress(value) ? "" : value,
      },
    ]);
  };

  const removeAddress = (i: number) => {
    const temp = [...airdropToItems];
    temp.splice(i, 1);
    setAirdropToItems(temp);
  };

  const onAirdrop = async () => {
    try {
      if (!isPrepared()) return;
      if (!Boolean(artistWallet) || !smartWallet) return;

      // Check if we have existing items
      if (airdropToItems.length === 0) return;

      setLoading(true);

      // Collect all items that need resolution
      const itemsToResolve: string[] = [];
      const itemsToResolveSet = new Set<string>();

      // Add items from airdropToItems that are still validating or have empty addresses
      const itemsNeedingResolution = airdropToItems.filter(
        (item) => item.status === "validating" || (item.status === "valid" && !item.address)
      );
      itemsNeedingResolution.forEach((item) => {
        if (item.ensName && !itemsToResolveSet.has(item.ensName)) {
          itemsToResolve.push(item.ensName);
          itemsToResolveSet.add(item.ensName);
        }
      });

      // Resolve all items that need resolution
      const resolvedNewItems = await Promise.all(
        itemsToResolve.map((item) => resolveAddressForAirdrop(item))
      );

      // Get existing valid items (exclude items that we just resolved)
      const existingValidItems = airdropToItems.filter((item) => {
        // Keep items that are already valid and have an address
        if (item.status === "valid" && item.address) {
          // Exclude if this item's ENS name is being resolved
          if (item.ensName) {
            return !itemsToResolveSet.has(item.ensName);
          }
          // For direct addresses (no ENS name), keep them
          return true;
        }
        return false;
      });

      // Merge resolved items with existing valid items
      const resolvedItems: AirdropItem[] = [...existingValidItems, ...resolvedNewItems];

      // Update state with all resolved items
      setAirdropToItems(resolvedItems);

      // Filter out invalid items
      const validItems = resolvedItems.filter((item) => item.status === "valid" && item.address);

      if (validItems.length === 0) {
        setLoading(false);
        toast.error("No valid addresses to airdrop");
        return;
      }

      const accessToken = await getAccessToken();
      if (!accessToken) throw Error("No access token found");

      const hash = await executeAirdrop({
        airdropToItems: validItems,
        moment,
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
    airdropToItems,
    onChangeAddress,
    loading,
    onAirdrop,
    removeAddress,
  };
};

export default useAirdrop;
