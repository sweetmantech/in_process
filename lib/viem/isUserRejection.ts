/**
 * Checks if an error is a user rejection (e.g., user rejected transaction in wallet).
 * Handles common rejection patterns from MetaMask, WalletConnect, and other wallets.
 */
export const isUserRejection = (error: unknown): boolean => {
  if (!error || typeof error !== "object") {
    return false;
  }

  const err = error as {
    code?: number;
    message?: string;
    shortMessage?: string;
  };

  return (
    err.code === 4001 ||
    Boolean(err.message?.toLowerCase().includes("rejected")) ||
    Boolean(err.shortMessage?.toLowerCase().includes("rejected")) ||
    Boolean(err.message?.toLowerCase().includes("denied")) ||
    Boolean(err.shortMessage?.toLowerCase().includes("denied"))
  );
};

