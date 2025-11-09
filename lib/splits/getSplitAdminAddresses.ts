import { Address, getAddress } from "viem";
import { SplitRecipient } from "@0xsplits/splits-sdk";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";

export interface SplitAdminAddresses {
  addresses: Address[];
  smartWallets: Address[];
}

/**
 * Gets all split addresses and their smart wallets for admin permission granting.
 * Assumes all split addresses are already resolved (no ENS names).
 */
export async function getSplitAdminAddresses(
  splits: SplitRecipient[] | undefined
): Promise<SplitAdminAddresses> {
  const addresses: Address[] = [];
  const smartWallets: Address[] = [];

  // Process each split recipient (addresses should already be resolved)
  if (splits && splits.length > 0) {
    const resolvedAddresses = splits.map((split) => getAddress(split.address as Address));

    // Add all resolved addresses
    addresses.push(...resolvedAddresses);

    // Get smart wallets for each split recipient address
    const smartWalletPromises = resolvedAddresses.map(async (address) => {
      const smartAccount = await getOrCreateSmartWallet({ address });
      return getAddress(smartAccount.address);
    });

    const resolvedSmartWallets = await Promise.all(smartWalletPromises);
    smartWallets.push(...resolvedSmartWallets);
  }

  // Deduplicate addresses and smart wallets to avoid duplicate permission calls
  const uniqueAddresses = Array.from(new Set(addresses.map((a) => a.toLowerCase()))).map((a) =>
    getAddress(a as Address)
  );
  const uniqueSmartWallets = Array.from(new Set(smartWallets.map((a) => a.toLowerCase()))).map(
    (a) => getAddress(a as Address)
  );

  return { addresses: uniqueAddresses, smartWallets: uniqueSmartWallets };
}
