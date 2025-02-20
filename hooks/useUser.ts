import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useMemo } from "react";

const useUser = () => {
  const { user, authenticated, login, ready } = usePrivy();
  const { wallets } = useWallets();
  const privyWallet = wallets?.find(
    (wallet) => wallet.walletClientType === "privy",
  );
  const socialWallet = privyWallet?.address;
  const externalWallets = useMemo(
    () => wallets?.find((wallet) => wallet.walletClientType !== "privy"),
    [wallets],
  );

  const isPrepared = () => {
    if (!(authenticated && ready)) {
      login();
      return false;
    }
    return true;
  };

  return {
    email: user?.email?.address,
    connectedWallet: socialWallet || externalWallets?.address || null,
    isPrepared,
  };
};

export default useUser;
