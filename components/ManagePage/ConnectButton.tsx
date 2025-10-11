import connectExternalWallet from "@/lib/smartwallets/connectExternalWallet";
import disconnectExternalWallet from "@/lib/smartwallets/disconnectExternalWallet";
import { useUserProvider } from "@/providers/UserProvider";
import { useConnectWallet } from "@privy-io/react-auth";
import { Fragment, useState } from "react";
import { Address } from "viem";
import CopyButton from "../CopyButton";

const ConnectButton = () => {
  const { smartWalletAddress, email, fetchAddresses, externalWallet } = useUserProvider();
  const isConnected = Boolean(externalWallet);
  const buttonText = isConnected ? "disconnect" : "connect";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { connectWallet } = useConnectWallet({
    onSuccess: async ({ wallet }) => {
      if (!smartWalletAddress) return;
      setIsLoading(true);
      await connectExternalWallet(smartWalletAddress, wallet.address as Address);
      await fetchAddresses();
      setIsLoading(false);
    },
  });

  const disconnect = async () => {
    if (!smartWalletAddress || !externalWallet) return;
    setIsLoading(true);
    await disconnectExternalWallet(smartWalletAddress, externalWallet);
    await fetchAddresses();
    setIsLoading(false);
  };

  if (!email || !smartWalletAddress) return <Fragment />;

  return (
    <div className="flex flex-col gap-2">
      {isConnected && <CopyButton address={externalWallet as Address} />}
      <button
        disabled={isLoading}
        onClick={isConnected ? disconnect : connectWallet}
        className="self-end w-full px-3 py-2 rounded-md flex justify-center items-center gap-2 bg-grey-moss-900 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
      >
        {isLoading ? `${buttonText}ing...` : buttonText}
      </button>
    </div>
  );
};

export default ConnectButton;
