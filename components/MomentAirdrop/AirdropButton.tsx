import { AirdropItem } from "@/types/airdrop";
import { useAirdropProvider } from "@/providers/AirdropProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useUserProvider } from "@/providers/UserProvider";
import useMomentLegacyWarning from "@/hooks/useMomentLegacyWarning";
import GrantMomentPermissionButton from "../MomentManagePage/GrantMomentPermissionButton";

const AirdropButton = () => {
  const { airdropToItems, onAirdrop, loading } = useAirdropProvider();
  const { owner, momentAdmins } = useMomentProvider();
  const { socialWalletAddress, artistWallet } = useUserProvider();
  const hasWarning = useMomentLegacyWarning();
  const canAirdrop =
    Boolean(owner?.toLowerCase() === socialWalletAddress?.toLowerCase()) ||
    Boolean(owner?.toLowerCase() === artistWallet?.toLowerCase()) ||
    Boolean(artistWallet && momentAdmins?.includes(artistWallet.toLowerCase()));

  if (hasWarning) {
    return <GrantMomentPermissionButton />;
  }

  return (
    <button
      type="button"
      disabled={
        !Boolean(airdropToItems.length) ||
        Boolean(airdropToItems.filter((item: AirdropItem) => item.status === "invalid").length) ||
        loading ||
        !canAirdrop
      }
      className="mt-2 w-fit rounded-md bg-black px-3 py-2 text-xs font-archivo text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:bg-grey-moss-300 disabled:hover:opacity-100"
      onClick={onAirdrop}
    >
      {loading ? "Loading..." : "airdrop"}
    </button>
  );
};

export default AirdropButton;
