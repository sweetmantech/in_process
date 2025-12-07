import connectSocialWallet from "@/lib/artists/connectSocialWallet";
import { useUserProvider } from "@/providers/UserProvider";
import { useConnectWallet } from "@privy-io/react-auth";
import { Fragment, useState } from "react";
import { Address } from "viem";
import CopyButton from "../CopyButton";
import disconnectSocialWallet from "@/lib/artists/disconnectSocialWallet";

const ConnectButton = () => {
  const { artistWallet, fetchArtistWallet, isSocialWallet, connectedAddress } = useUserProvider();
  const shouldConnect =
    artistWallet === connectedAddress && Boolean(artistWallet) && isSocialWallet;
  const buttonText = shouldConnect ? "connect" : "disconnect";

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { connectWallet } = useConnectWallet({
    onSuccess: async ({ wallet }) => {
      setIsLoading(true);
      await connectSocialWallet(wallet.address as Address, connectedAddress as Address);
      await fetchArtistWallet();
      setIsLoading(false);
    },
  });

  const disconnect = async () => {
    setIsLoading(true);
    await disconnectSocialWallet(connectedAddress as Address);
    await fetchArtistWallet();
    setIsLoading(false);
  };

  if (!isSocialWallet || !artistWallet) return <Fragment />;

  return (
    <div className="flex w-full flex-col items-end gap-2 md:flex-row md:justify-end">
      {!shouldConnect && <CopyButton address={artistWallet as Address} />}
      <button
        disabled={isLoading}
        onClick={shouldConnect ? connectWallet : disconnect}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 md:w-fit md:min-w-[150px]"
      >
        {isLoading ? `${buttonText}ing...` : buttonText}
      </button>
    </div>
  );
};

export default ConnectButton;
