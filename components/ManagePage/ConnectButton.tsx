import connectSocialWallet from "@/lib/artists/connectSocialWallet";
import { useUserProvider } from "@/providers/UserProvider";
import { useConnectWallet } from "@privy-io/react-auth";
import { Fragment, useState } from "react";
import { Address } from "viem";
import CopyButton from "../CopyButton";
import disconnectSocialWallet from "@/lib/artists/disconnectSocialWallet";

const ConnectButton = () => {
  const { artistWallet, fetchSmartWallet, isSocialWallet, connectedAddress } = useUserProvider();
  const buttonText = artistWallet ? "disconnect" : "connect";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { connectWallet } = useConnectWallet({
    onSuccess: async ({ wallet }) => {
      setIsLoading(true);
      await connectSocialWallet(wallet.address as Address, connectedAddress as Address);
      await fetchSmartWallet();
      setIsLoading(false);
    },
  });

  const disconnect = async () => {
    setIsLoading(true);
    await disconnectSocialWallet(connectedAddress as Address);
    await fetchSmartWallet();
    setIsLoading(false);
  };

  if (!isSocialWallet) return <Fragment />;

  return (
    <div className="flex gap-2">
      {artistWallet && <CopyButton address={artistWallet as Address} />}
      <button
        disabled={isLoading}
        onClick={artistWallet ? disconnect : connectWallet}
        className="self-end min-w-[150px] py-2 rounded-md flex justify-center items-center gap-2 bg-grey-moss-900 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
      >
        {isLoading ? `${buttonText}ing...` : buttonText}
      </button>
    </div>
  );
};

export default ConnectButton;
