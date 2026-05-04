import { useCallback, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useFrameProvider } from "@/providers/FrameProvider";
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
  const { context, frameReady } = useFrameProvider();
  const { address: farcasterAddress } = useConnection();
  const { privyWallet, isPrivyReady } = useConnectedWallet();

  const isFarcasterMiniApp = frameReady && Boolean(context);
  const isSocialWallet = frameReady && Boolean(context || user?.email?.address);

  const [state, setState] = useState<ArtistWalletState>(INITIAL_STATE);

  const fetchArtistWallet = useCallback(async () => {
    if (isFarcasterMiniApp) {
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
  }, [isFarcasterMiniApp, farcasterAddress, privyWallet, isSocialWallet, isPrivyReady]);

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
