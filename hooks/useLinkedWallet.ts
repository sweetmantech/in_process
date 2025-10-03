import { usePrivy } from "@privy-io/react-auth";

interface UseLinkedWalletReturn {
  walletAddress: string | undefined;
}

export const useLinkedWallet = (): UseLinkedWalletReturn => {
  const { user } = usePrivy();

  const externalWallets =
    user?.linkedAccounts?.filter(
      (account) =>
        account.type === "wallet" && account.walletClientType !== "privy"
    ) || [];

  const walletAddress =
    externalWallets[0]?.type === "wallet"
      ? externalWallets[0].address
      : undefined;

  return {
    walletAddress,
  };
};
