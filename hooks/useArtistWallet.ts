import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import getArtistWallet from "@/lib/artists/getArtistWallet";
import { usePrivy } from "@privy-io/react-auth";
import { CHAIN_ID } from "@/lib/consts";
import { migrateMomentsApi } from "@/lib/moment/migrateMomentsApi";
import useConnectedWallet from "./useConnectedWallet";

const useArtistWallet = ({ isSocialWallet }: { isSocialWallet: boolean }) => {
  const { privyWallet } = useConnectedWallet();
  const { ready } = usePrivy();
  const [artistWallet, setArtistWallet] = useState<Address | undefined>(undefined);
  const [isExternalWallet, setIsExternalWallet] = useState<boolean>(false);
  const { getAccessToken } = usePrivy();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const fetchArtistWallet = useCallback(async () => {
    if (ready) {
      if (!privyWallet?.address) {
        setArtistWallet(undefined);
        setIsExternalWallet(false);
        setIsLoaded(true);
        return;
      }
      const artistWallet = isSocialWallet
        ? await getArtistWallet(privyWallet.address as Address)
        : privyWallet.address;
      setIsExternalWallet(Boolean(artistWallet));
      setArtistWallet(artistWallet || (privyWallet.address as Address));
      setIsLoaded(true);
      if (artistWallet) {
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
  }, [privyWallet, isSocialWallet, getAccessToken, ready]);

  useEffect(() => {
    fetchArtistWallet();
  }, [fetchArtistWallet]);

  return {
    artistWallet,
    fetchArtistWallet,
    isExternalWallet,
    isLoaded,
  };
};

export default useArtistWallet;
