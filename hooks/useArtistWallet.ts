import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import getArtistWallet from "@/lib/artists/getArtistWallet";
import { usePrivy } from "@privy-io/react-auth";
import { CHAIN_ID } from "@/lib/consts";
import { migrateMomentsApi } from "@/lib/moment/migrateMomentsApi";

const useArtistWallet = ({
  connectedAddress,
  isSocialWallet,
}: {
  connectedAddress: Address | undefined;
  isSocialWallet: boolean;
}) => {
  const [artistWallet, setArtistWallet] = useState<Address | undefined>(undefined);
  const [isExternalWallet, setIsExternalWallet] = useState<boolean>(false);
  const { getAccessToken } = usePrivy();

  const fetchArtistWallet = useCallback(async () => {
    if (!connectedAddress) {
      setArtistWallet(undefined);
      setIsExternalWallet(false);
      return;
    }
    const artistWallet = isSocialWallet
      ? await getArtistWallet(connectedAddress)
      : connectedAddress;
    setIsExternalWallet(Boolean(artistWallet));
    setArtistWallet(artistWallet || connectedAddress);
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
  }, [connectedAddress, isSocialWallet, getAccessToken]);

  useEffect(() => {
    fetchArtistWallet();
  }, [fetchArtistWallet]);

  return {
    artistWallet,
    fetchArtistWallet,
    isExternalWallet,
  };
};

export default useArtistWallet;
