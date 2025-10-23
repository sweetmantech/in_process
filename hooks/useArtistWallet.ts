import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import getArtistWallet from "@/lib/artists/getArtistWallet";

const useArtistWallet = ({
  connectedAddress,
  isSocialWallet,
}: {
  connectedAddress: Address | undefined;
  isSocialWallet: boolean;
}) => {
  const [artistWallet, setArtistWallet] = useState<Address | null>(null);
  const fetchArtistWallet = useCallback(async () => {
    if (!connectedAddress) {
      setArtistWallet(null);
      return;
    }
    const artistWallet = isSocialWallet
      ? await getArtistWallet(connectedAddress)
      : connectedAddress;
    setArtistWallet(artistWallet || connectedAddress);
  }, [connectedAddress, isSocialWallet]);

  useEffect(() => {
    fetchArtistWallet();
  }, [fetchArtistWallet]);

  return {
    artistWallet,
    fetchArtistWallet,
  };
};

export default useArtistWallet;
