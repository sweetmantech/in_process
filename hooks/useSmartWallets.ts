import { useCallback, useEffect, useState } from "react";
import getSmartWallet from "@/lib/smartwallets/getSmartWallet";
import getExternalWallet from "@/lib/smartwallets/getExternalWallet";
import { Address } from "viem";
import useSignedAddress from "./useSignedAddress";

const useSmartWallets = () => {
  const signedAddress = useSignedAddress();

  const [smartWalletAddress, setSmartWalletAddress] = useState<Address | undefined>();
  const [externalWallet, setExternalWallet] = useState<Address | undefined>();

  const fetchAddresses = useCallback(async () => {
    if (!signedAddress) return;
    const smartWallet = await getSmartWallet(signedAddress as Address);
    setSmartWalletAddress(smartWallet.toLowerCase() as Address);
    const externalWallet = await getExternalWallet(smartWallet);
    setExternalWallet(externalWallet);
  }, [signedAddress]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return {
    smartWalletAddress,
    externalWallet,
    fetchAddresses,
  };
};

export default useSmartWallets;
