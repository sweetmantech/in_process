import connectExternalWallet from "@/lib/smartwallets/connectExternalWallet";
import disconnectExternalWallet from "@/lib/smartwallets/disconnectExternalWallet";
import { useUserProvider } from "@/providers/UserProvider";
import { useConnectWallet } from "@privy-io/react-auth";
import { Fragment, useState } from "react";
import { Address } from "viem";

const ConnectButton = () => {
  const { smartWalletAddress, email, fetchAddresses, externalWallet } = useUserProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { connectWallet } = useConnectWallet({
    onSuccess: async ({ wallet }) => {
      if (!smartWalletAddress) return;
      setIsLoading(true);
      await connectExternalWallet(smartWalletAddress, wallet.address as Address);
      fetchAddresses();
      setIsLoading(false);
    },
  });

  const disconnect = async () => {
    if (!smartWalletAddress || !externalWallet) return;
    await disconnectExternalWallet(smartWalletAddress, externalWallet);
    fetchAddresses();
  };

  if (!email || !smartWalletAddress) return <Fragment />;

  if (externalWallet)
    return (
      <button
        onClick={disconnect}
        className="self-end px-4 py-2 rounded-md flex items-center gap-2 bg-grey-moss-900 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
      >
        {isLoading ? "disconnecting..." : "disconnect"}
      </button>
    );

  return (
    <button
      onClick={connectWallet}
      className="self-end px-4 py-2 rounded-md flex items-center gap-2 bg-grey-moss-900 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
    >
      {isLoading ? "connecting..." : "connect"}
    </button>
  );
};

export default ConnectButton;
