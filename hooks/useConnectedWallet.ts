import { useWallets } from "@privy-io/react-auth";

const useConnectedWallet = () => {
  const { wallets, ready } = useWallets();
  const privyWallet =
    ready && wallets ? wallets?.find((wallet) => wallet.walletClientType === "privy") : null;
  const externalWallet =
    ready && wallets ? wallets?.find((wallet) => wallet.walletClientType !== "privy") : null;

  return {
    externalWallet,
    privyWallet,
  };
};

export default useConnectedWallet;
