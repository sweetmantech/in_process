import { AirdropItem } from "@/hooks/useAirdrop";
import { useAirdropProvider } from "@/providers/AirdropProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useUserProvider } from "@/providers/UserProvider";

const AirdropButton = () => {
  const { airdropToItems, onAirdrop, loading } = useAirdropProvider();
  const { owner, momentAdmins } = useMomentProvider();
  const { connectedAddress, artistWallet } = useUserProvider();
  const canAirdrop =
    Boolean(owner?.toLowerCase() === connectedAddress?.toLowerCase()) ||
    Boolean(owner?.toLowerCase() === artistWallet?.toLowerCase()) ||
    Boolean(artistWallet && momentAdmins?.includes(artistWallet.toLowerCase()));

  return (
    <button
      type="button"
      disabled={
        !Boolean(airdropToItems.length) ||
        Boolean(airdropToItems.filter((item: AirdropItem) => item.status === "invalid").length) ||
        loading ||
        !canAirdrop
      }
      className="mt-4 w-fit rounded-md bg-black px-3 py-1 font-archivo text-white disabled:cursor-not-allowed disabled:bg-grey-moss-300"
      onClick={onAirdrop}
    >
      {loading ? "Loading..." : "Airdrop"}
    </button>
  );
};

export default AirdropButton;
