import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect } from "react";

const useConnectedWallet = () => {
  const { wallets, ready } = useWallets();
  const { logout, authenticated } = usePrivy();
  const privyWallet = wallets?.find(
    (wallet) => wallet.walletClientType === "privy",
  );
  const externalWallet = wallets?.find(
    (wallet) => wallet.walletClientType !== "privy",
  );
  const wallet =
    authenticated && ready ? privyWallet || externalWallet : undefined;
  const connectedWallet = wallet?.address;

  useEffect(() => {
    if (ready && !wallets.length) logout();
  }, [ready, wallets]);
  return {
    connectedWallet,
    wallet,
  };
};

export default useConnectedWallet;
