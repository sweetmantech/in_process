import { AirdropItem } from "@/types/airdrop";
import { useAirdropProvider } from "@/providers/AirdropProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useUserProvider } from "@/providers/UserProvider";

const AirdropButton = () => {
  const { airdropToItems, onAirdrop, loading, pendingInputValue, setPendingInputValue } =
    useAirdropProvider();
  const { owner, momentAdmins } = useMomentProvider();
  const { connectedAddress, artistWallet } = useUserProvider();
  const canAirdrop =
    Boolean(owner?.toLowerCase() === connectedAddress?.toLowerCase()) ||
    Boolean(owner?.toLowerCase() === artistWallet?.toLowerCase()) ||
    Boolean(artistWallet && momentAdmins?.includes(artistWallet.toLowerCase()));

  const handleAirdrop = async () => {
    await onAirdrop(pendingInputValue);
    // Clear pending input value after airdrop
    setPendingInputValue([]);
  };

  return (
    <button
      type="button"
      disabled={
        (!Boolean(airdropToItems.length) && !pendingInputValue?.length) ||
        Boolean(airdropToItems.filter((item: AirdropItem) => item.status === "invalid").length) ||
        loading ||
        !canAirdrop
      }
      className="mt-2 w-fit rounded-md bg-black px-3 py-2 text-xs font-archivo text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:bg-grey-moss-300 disabled:hover:opacity-100"
      onClick={handleAirdrop}
    >
      {loading ? "Loading..." : "Airdrop"}
    </button>
  );
};

export default AirdropButton;
