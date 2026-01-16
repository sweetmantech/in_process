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
  const [artistWallet, setArtistWallet] = useState<Address | undefined>(undefined);
  const [isExternalWallet, setIsExternalWallet] = useState<boolean>(false);

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
    // setArtistWallet(artistWallet || connectedAddress);
    setArtistWallet("0x26ef03a20aaeda8aafcee4e146dc6b328195947c");
  }, [connectedAddress, isSocialWallet]);

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
