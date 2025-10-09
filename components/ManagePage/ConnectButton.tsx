import connectExternalWallet from "@/lib/connectExternalWallet";
import { useUserProvider } from "@/providers/UserProvider";
import { useConnectWallet } from "@privy-io/react-auth";
import { Fragment } from "react";
import { Address } from "viem";

const ConnectButton = () => {
  const { connectedAddress, email } = useUserProvider();
  const { connectWallet } = useConnectWallet({
    onSuccess: async ({ wallet }) => {
      connectExternalWallet(connectedAddress as Address, wallet.address as Address);
    },
  });

  if (!email || !connectedAddress) return <Fragment />;

  return (
    <button
      onClick={connectWallet}
      className="self-end px-4 py-2 rounded-md flex items-center gap-2 bg-grey-moss-900 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900"
    >
      connect
    </button>
  );
};

export default ConnectButton;
