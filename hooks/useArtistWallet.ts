import { useCallback, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { useConnection } from "wagmi";
import { Address } from "viem";
import getArtistWallet from "@/lib/artists/getArtistWallet";
import useConnectedWallet from "./useConnectedWallet";

type ArtistWalletState = {
  wallet: Address | undefined;
  isExternal: boolean;
  isLoaded: boolean;
};

const INITIAL_STATE: ArtistWalletState = { wallet: undefined, isExternal: false, isLoaded: false };

const useArtistWallet = () => {
  const { user } = usePrivy();
  const { isMiniApp, miniAppReady } = useMiniAppProvider();
  const { address: farcasterAddress } = useConnection();
  const { privyWallet, isPrivyReady } = useConnectedWallet();

  const isSocialWallet = miniAppReady && (isMiniApp || Boolean(user?.email?.address));

  const [state, setState] = useState<ArtistWalletState>(INITIAL_STATE);

  const fetchArtistWallet = useCallback(async () => {
    if (isMiniApp) {
      if (!farcasterAddress) return;
      setState({ wallet: farcasterAddress, isExternal: false, isLoaded: true });
      return;
    }

    if (!isPrivyReady) return;
    if (!privyWallet?.address) {
      setState({ wallet: undefined, isExternal: false, isLoaded: true });
      return;
    }

    const privyAddress = privyWallet.address as Address;
    const linked = isSocialWallet ? await getArtistWallet(privyAddress) : null;
    setState({ wallet: linked ?? privyAddress, isExternal: Boolean(linked), isLoaded: true });
  }, [isMiniApp, farcasterAddress, privyWallet, isSocialWallet, isPrivyReady]);

  useEffect(() => {
    fetchArtistWallet();
  }, [fetchArtistWallet]);

  return {
    artistWallet: state.wallet,
    isExternalWallet: state.isExternal,
    artistWalletLoaded: state.isLoaded,
    fetchArtistWallet,
  };
};

export default useArtistWallet;
