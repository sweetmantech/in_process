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
      className={`text-grey-moss-500 font-archivo text-xs underline hover:text-red-600 ${className || ""}`}
    >
      unlink
    </button>
  );
};

export default UnlinkWallet;
