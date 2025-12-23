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

      // Separate items into those that need resolution and those that are already valid
      const itemsNeedingResolution: Array<{ item: AirdropItem; originalIndex: number }> = [];
      const alreadyValidItems: AirdropItem[] = [];

      airdropToItems.forEach((item, index) => {
        if (item.status === "validating" || (item.status === "valid" && !item.address)) {
          // Item needs resolution - preserve original index for mapping
          itemsNeedingResolution.push({ item, originalIndex: index });
        } else if (item.status === "valid" && item.address) {
          // Item is already valid - keep as is
          alreadyValidItems.push(item);
        }
      });

      // Resolve each item individually (preserve duplicates)
      const resolvedItems = await Promise.all(
        itemsNeedingResolution.map(({ item }) =>
          item.ensName ? resolveAddressForAirdrop(item.ensName) : Promise.resolve(item)
        )
      );

      // Build the final array preserving original order and duplicates
      // Start with already valid items, then merge resolved items at their original positions
      const finalItems: AirdropItem[] = [...airdropToItems];

      // Update items that were resolved, preserving their original positions
      itemsNeedingResolution.forEach(({ originalIndex }, resolvedIndex) => {
        finalItems[originalIndex] = resolvedItems[resolvedIndex];
      });

      // Update state with all resolved items (preserving order and duplicates)
      setAirdropToItems(finalItems);

      // Filter out invalid items for airdrop execution
      const validItems = finalItems.filter((item) => item.status === "valid" && item.address);

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
