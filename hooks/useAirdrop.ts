import { useUserProvider } from "@/providers/UserProvider";
import { useState } from "react";
import { Address, isAddress } from "viem";
import { toast } from "sonner";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { usePrivy } from "@privy-io/react-auth";
import { executeAirdrop } from "@/lib/moment/executeAirdrop";
import { useMomentProvider } from "@/providers/MomentProvider";
import { AirdropItem } from "@/types/airdrop";
import { processAirdropItems } from "@/lib/airdrop/processAirdropItems";
import resolveAddressForAirdrop from "@/lib/ens/resolveAddressForAirdrop";

const useAirdrop = () => {
  const { moment } = useMomentProvider();
  const [airdropToItems, setAirdropToItems] = useState<AirdropItem[]>([]);
  const { artistWallet, isPrepared } = useUserProvider();
  const { smartWallet } = useSmartWalletProvider();
  const [loading, setLoading] = useState<boolean>(false);
  const { getAccessToken } = usePrivy();

  const onChangeAddress = async (value: string) => {
    if (!value) return;

    // If it's already a valid address, add it immediately
    if (isAddress(value)) {
      setAirdropToItems((prev) => [
        ...prev,
        {
          address: value,
          status: "valid",
          ensName: "",
        },
      ]);
      return;
    }

    // For ENS names, add with "validating" status first for immediate UI feedback
    const newItem: AirdropItem = {
      address: "",
      status: "validating",
      ensName: value,
    };

    // Add the item to the list
    setAirdropToItems((prev) => [...prev, newItem]);

    // Immediately resolve the ENS name
    const resolvedItem = await resolveAddressForAirdrop(value);

    // Update the item - find the last matching item with this ensName and validating status
    setAirdropToItems((current) => {
      const updated = [...current];
      // Find the last item that matches (most recently added)
      for (let i = updated.length - 1; i >= 0; i--) {
        if (
          updated[i]?.ensName === value &&
          updated[i]?.status === "validating" &&
          !updated[i]?.address
        ) {
          updated[i] = resolvedItem;
          break;
        }
      }
      return updated;
    });
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

      const { finalItems, validItems } = await processAirdropItems(airdropToItems);

      // Update state with all resolved items (preserving order and duplicates)
      setAirdropToItems(finalItems);

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

      // Clear airdrop items after successful airdrop
      setAirdropToItems([]);
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
