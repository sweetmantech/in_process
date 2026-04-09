import { useCallback, useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useConnection } from "wagmi";
import { Address } from "viem";
import getArtistWallet from "@/lib/artists/getArtistWallet";
import { CHAIN_ID } from "@/lib/consts";
import { migrateMomentsApi } from "@/lib/moment/migrateMomentsApi";
import useConnectedWallet from "./useConnectedWallet";

const useArtistWallet = () => {
  const { getAccessToken } = usePrivy();
  const { context } = useFrameProvider();
  const { address: farcasterAddress } = useConnection();
  const { privyWallet } = useConnectedWallet();

  const isFarcasterMiniApp = Boolean(context);
  const isSocialWallet = Boolean(context || privyWallet);

  const [artistWallet, setArtistWallet] = useState<Address | undefined>();
  const [isExternalWallet, setIsExternalWallet] = useState<boolean>(false);
  const [artistWalletLoaded, setArtistWalletLoaded] = useState<boolean>(false);

  const resolveArtistWallet = useCallback(async () => {
    if (isFarcasterMiniApp) {
      setArtistWallet(farcasterAddress);
      setIsExternalWallet(false);
      setArtistWalletLoaded(true);
      return;
    }

    if (privyWallet !== null) {
      if (!privyWallet?.address) {
        setArtistWallet(undefined);
        setIsExternalWallet(false);
        setArtistWalletLoaded(true);
        return;
      }

      const linkedExternalWallet = isSocialWallet
        ? await getArtistWallet(privyWallet.address as Address)
        : null;

      const resolvedWallet = linkedExternalWallet ?? (privyWallet.address as Address);
      const hasLinkedExternalWallet = Boolean(linkedExternalWallet);

      setIsExternalWallet(hasLinkedExternalWallet);
      setArtistWallet(resolvedWallet);
      setArtistWalletLoaded(true);

      if (hasLinkedExternalWallet) {
        try {
          const accessToken = await getAccessToken();
          if (accessToken) {
            await migrateMomentsApi({ chainId: CHAIN_ID }, accessToken);
          }
        } catch (error) {
          console.error("Failed to migrate moments:", error);
        }
      }
    }
  }, [isFarcasterMiniApp, farcasterAddress, privyWallet, isSocialWallet, getAccessToken]);

  useEffect(() => {
    resolveArtistWallet();
  }, [resolveArtistWallet]);

  return {
    artistWallet,
    isExternalWallet,
    artistWalletLoaded,
    fetchArtistWallet: resolveArtistWallet,
  };
};

export default useArtistWallet;
