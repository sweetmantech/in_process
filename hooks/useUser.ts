import { usePrivy } from "@privy-io/react-auth";
import useConnectedWallet from "./useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useAccount, useConnect } from "wagmi";
import { config } from "@/providers/WagmiProvider";
import useSignedAddress from "./useSignedAddress";
import { useArtistProfile } from "./useArtistProfile";
import useBalance from "./useBalance";
import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";
import getSmartWallet from "@/lib/smartwallets/getSmartWallet";
import getExternalWallet from "@/lib/smartwallets/getExternalWallet";

const useUser = () => {
  const { user, login } = usePrivy();
  const { connectedWallet } = useConnectedWallet();
  const { context } = useFrameProvider();
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const signedAddress = useSignedAddress();
  const userProfile = useArtistProfile(signedAddress);
  const balances = useBalance();
  const [smartWalletAddress, setSmartWalletAddress] = useState<Address | undefined>();
  const [externalWallet, setExternalWallet] = useState<Address | undefined>();

  const isPrepared = () => {
    if (context) {
      if (!isConnected) {
        connect({ connector: config.connectors[0] });
        return false;
      }
      return true;
    }
    if (!connectedWallet) {
      login();
      return false;
    }
    return true;
  };

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
    email: user?.email?.address,
    isPrepared,
    profile: userProfile.data,
    connectedAddress: signedAddress,
    getProfile: () => userProfile.refetch(),
    balances,
    smartWalletAddress,
    externalWallet,
    fetchAddresses,
  };
};

export default useUser;
