import { usePrivy } from "@privy-io/react-auth";
import useConnectedWallet from "./useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useAccount, useConnect } from "wagmi";
import { config } from "@/providers/WagmiProvider";
import { Address } from "viem";

const useUser = () => {
  const { user, login } = usePrivy();
  const { privyWallet } = useConnectedWallet();
  const { context } = useFrameProvider();
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const isSocialWallet = Boolean(context || user?.email?.address);

  const isPrepared = () => {
    if (context) {
      if (!isConnected) {
        connect({ connector: config.connectors[0] });
        return false;
      }
      return true;
    }
    if (!privyWallet) {
      login();
      return false;
    }
    return true;
  };

  return {
    email: user?.email?.address,
    isPrepared,
    isSocialWallet,
    socialWalletAddress: privyWallet?.address as Address | undefined,
  };
};

export default useUser;
