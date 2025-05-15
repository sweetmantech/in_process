import { AirdropItem } from "@/hooks/useAirdrop";
import { useAirdropProvider } from "@/providers/AirdropProvider";
import { useTokenProvider } from "@/providers/TokenProvider";
import { useUserProvider } from "@/providers/UserProvider";

const AirdropButton = () => {
  const { airdopToItems, onAirdrop, loading } = useAirdropProvider();
  const { owner } = useTokenProvider();
  const { connectedAddress } = useUserProvider();
  const isOwner = Boolean(
    owner?.toLowerCase() === connectedAddress?.toLowerCase(),
  );

  return (
    <button
      type="button"
      disabled={
        Boolean(
          airdopToItems.filter((item: AirdropItem) => item.status === "invalid")
            .length,
        ) ||
        loading ||
        !isOwner
      }
      className="mt-4 bg-black text-white font-archivo px-3 py-1 rounded-md w-fit disabled:bg-grey-moss-300 disabled:cursor-not-allowed"
      onClick={onAirdrop}
    >
      {loading ? "Loading..." : "Airdrop"}
    </button>
  );
};

export default AirdropButton;
