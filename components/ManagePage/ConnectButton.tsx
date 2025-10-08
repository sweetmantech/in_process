import { useConnectWallet } from "@privy-io/react-auth";

const ConnectButton = () => {
  const { connectWallet } = useConnectWallet();

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
