"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import truncateAddress from "@/lib/truncateAddress";
import { Address } from "viem";
import { useArtistProfile } from "@/hooks/useArtistProfile";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { useUserProvider } from "@/providers/UserProvider";

const CollectionAdmin = ({ address }: { address: Address }) => {
  const { data: artistProfile } = useArtistProfile(address);
  const { smartWallet } = useSmartWalletProvider();
  const { artistWallet } = useUserProvider();

  const isRemovable =
    address.toLowerCase() !== artistWallet?.toLowerCase() &&
    address.toLowerCase() !== smartWallet.toLowerCase();

  return (
    <div className="flex items-center justify-between rounded-lg border border-grey-secondary bg-grey-eggshell p-3">
      {artistProfile ? (
        <p className="font-archivo text-sm text-grey-moss-600">
          {artistProfile.username || truncateAddress(address)}
        </p>
      ) : (
        <p className="font-archivo text-sm text-grey-moss-600">Loading...</p>
      )}
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!isRemovable}
        className="border-red-300 text-red-600 hover:bg-red-50"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CollectionAdmin;
