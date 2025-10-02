import CopyButton from "../CopyButton";

interface LinkedWalletProps {
  walletAddress: string;
  className?: string;
}

const LinkedWallet = ({ walletAddress, className }: LinkedWalletProps) => {
  return (
    <div className={`mt-4 ${className || ""}`}>
      <div className="bg-grey-eggshell border border-grey-moss-200 rounded-sm p-4">
        <p className="text-sm text-grey-moss-600 font-archivo mb-1">
          Connected Wallet
        </p>
        <CopyButton
          address={walletAddress}
          className="flex items-center gap-2 text-black font-archivo text-lg break-all bg-transparent hover:bg-transparent p-0 hover:text-grey-moss-600"
          showTruncated={false}
        />
      </div>
    </div>
  );
};

export default LinkedWallet;
