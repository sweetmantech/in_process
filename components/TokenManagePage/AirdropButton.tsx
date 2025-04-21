import { useAirdropProvider } from "@/providers/AirdropProvider";
import { isAddress } from "viem";

const AirdropButton = () => {
  const { walletAddresses, onAirdrop, loading } = useAirdropProvider();

  return (
    <button
      type="button"
      disabled={
        !Boolean(
          walletAddresses.filter((wallet: string) => isAddress(wallet)).length,
        ) || loading
      }
      className="bg-black text-white font-archivo px-3 py-1 rounded-md w-fit disabled:bg-grey-moss-300 disabled:cursor-not-allowed"
      onClick={onAirdrop}
    >
      {loading ? "Loading..." : "Airdrop"}
    </button>
  );
};

export default AirdropButton;
