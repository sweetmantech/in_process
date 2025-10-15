import { useCallback, useEffect, useState } from "react";
import getSmartWallet from "@/lib/smartwallets/getSmartWallet";
import { Address } from "viem";
import getArtistWallet from "@/lib/artists/getArtistWallet";

const useSmartWallets = ({
  connectedAddress,
  isSocialWallet,
}: {
  connectedAddress: Address | undefined;
  isSocialWallet: boolean;
}) => {
  const [smartWallet, setSmartWallet] = useState<Address | null>(null);
  const [artistWallet, setArtistWallet] = useState<Address | null>(null);

  const fetchSmartWallet = useCallback(async () => {
    if (!connectedAddress) {
      setSmartWallet(null);
      setArtistWallet(null);
      return;
    }
    const artistWallet = isSocialWallet
      ? await getArtistWallet(connectedAddress)
      : connectedAddress;
    setArtistWallet(artistWallet);
    if (!artistWallet) {
      setSmartWallet(null);
      return;
    }
    const smartWallet = await getSmartWallet(artistWallet);
    setSmartWallet(smartWallet);
  }, [connectedAddress, isSocialWallet]);

  useEffect(() => {
    fetchSmartWallet();
  }, [fetchSmartWallet]);

  return {
    smartWallet,
    artistWallet,
    fetchSmartWallet,
  };
};

export default useSmartWallets;
