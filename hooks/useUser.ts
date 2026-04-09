import { usePrivy } from "@privy-io/react-auth";
import useConnectedWallet from "./useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useConnection, useConnect } from "wagmi";
import { config } from "@/providers/WagmiProvider";
import { Address } from "viem";
import useAuthHeaders from "./useAuthHeaders";
import useArtistWallet from "./useArtistWallet";

const useUser = () => {
  const { user, login } = usePrivy();
  const getAuthHeaders = useAuthHeaders();
  const { privyWallet } = useConnectedWallet();
  const { context } = useFrameProvider();
  const { isConnected, address: farcasterAddress } = useConnection();
  const { mutate: connect } = useConnect();
  const { artistWallet, isExternalWallet, artistWalletLoaded, fetchArtistWallet } =
    useArtistWallet();

  // isSocialWallet: email or Farcaster frame auth (no direct wallet control)
  const isSocialWallet = Boolean(context || user?.email?.address);
  const isFarcasterMiniApp = Boolean(context);

  // Triggers login/connect if not ready; returns false until the user is connected.
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
    isFarcasterMiniApp,
    socialWalletAddress: (isFarcasterMiniApp ? farcasterAddress : privyWallet?.address) as
      | Address
      | undefined,
    artistWallet,
    fetchArtistWallet,
    isExternalWallet,
    artistWalletLoaded,
    getAuthHeaders,
  };
};

export default useUser;
