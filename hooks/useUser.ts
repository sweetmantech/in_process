import { usePrivy } from "@privy-io/react-auth";
import useConnectedWallet from "./useConnectedWallet";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { useConnection, useConnect } from "wagmi";
import { config } from "@/providers/WagmiProvider";
import { Address } from "viem";
import useAuthHeaders from "./useAuthHeaders";
import useArtistWallet from "./useArtistWallet";

const useUser = () => {
  const { user, login } = usePrivy();
  const getAuthHeaders = useAuthHeaders();
  const { privyWallet } = useConnectedWallet();
  const { isMiniApp } = useMiniAppProvider();
  const { isConnected, address: farcasterAddress } = useConnection();
  const { mutate: connect } = useConnect();
  const { artistWallet, isExternalWallet, artistWalletLoaded, fetchArtistWallet } =
    useArtistWallet();

  const isSocialWallet = Boolean(isMiniApp || user?.email?.address);

  // Triggers login/connect if not ready; returns false until the user is connected.
  const isPrepared = () => {
    if (isMiniApp) {
      if (!isConnected) connect({ connector: config.connectors[0] });
      return isConnected;
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
    isMiniApp,
    socialWalletAddress: (isMiniApp ? farcasterAddress : privyWallet?.address) as
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
