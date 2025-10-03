import { usePrivy } from "@privy-io/react-auth";

interface UnlinkWalletProps {
  walletAddress: string;
  className?: string;
}

const UnlinkWallet = ({ walletAddress, className }: UnlinkWalletProps) => {
  const { unlinkWallet } = usePrivy();

  return (
    <button
      onClick={() => unlinkWallet(walletAddress)}
      className={`text-xs text-grey-moss-500 hover:text-red-600 font-archivo underline ${className || ""}`}
    >
      unlink
    </button>
  );
};

export default UnlinkWallet;
