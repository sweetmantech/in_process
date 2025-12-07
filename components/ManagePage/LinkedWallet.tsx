import CopyButton from "../CopyButton";
import UnlinkWallet from "./UnlinkWallet";

interface LinkedWalletProps {
  walletAddress: string;
  className?: string;
}

const LinkedWallet = ({ walletAddress, className }: LinkedWalletProps) => {
  return (
    <div className={`mt-4 ${className || ""}`}>
      <div className="rounded-sm border border-grey-moss-200 bg-grey-eggshell p-4">
        <div className="mb-1 flex items-center justify-between">
          <p className="text-grey-moss-600 font-archivo text-sm">Connected Wallet</p>
          <UnlinkWallet walletAddress={walletAddress} />
        </div>
        <CopyButton
          address={walletAddress}
          className="hover:text-grey-moss-600 flex items-center gap-2 break-all bg-transparent p-0 font-archivo text-lg text-black hover:bg-transparent"
        />
      </div>
    </div>
  );
};

export default LinkedWallet;
