import { Address, erc20Abi, zeroAddress } from "viem";
import { getPublicClient } from "@/lib/viem/publicClient";
import { createPublicClient, http } from "viem";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import getAlchemyRpcUrl from "@/lib/alchemy/getAlchemyRpcUrl";

interface SmartWalletBalance {
  walletAddress: Address;
  balance: bigint;
}

/**
 * Get all smart wallet balances using multicall.
 * For ETH (zeroAddress): uses Promise.all with getBalance (efficient batch call)
 * For ERC20: uses multicall with balanceOf calls
 */
async function getWalletBalances(
  wallets: Address[],
  currency: Address,
  chainId: number
): Promise<SmartWalletBalance[]> {
  const isEth = currency.toLowerCase() === zeroAddress.toLowerCase();

  if (isEth) {
    // For ETH, create a batched public client
    // Viem's HTTP transport automatically batches multiple getBalance calls
    // made in the same event loop tick into a single JSON-RPC batch request
    const batchedClient = createPublicClient({
      chain: getViemNetwork(chainId) as any,
      transport: http(getAlchemyRpcUrl(chainId), {
        batch: {
          wait: 0, // Batch all calls made in the same event loop tick
        },
      }),
    });

    // These getBalance calls will be automatically batched into a single RPC request
    const balancePromises = wallets.map((wallet) => batchedClient.getBalance({ address: wallet }));
    const balances = await Promise.all(balancePromises);

    return wallets.map((wallet, index) => ({
      walletAddress: wallet,
      balance: balances[index],
    }));
  } else {
    // For ERC20, use multicall with balanceOf calls
    const publicClient = getPublicClient(chainId);

    const balanceCalls = wallets.map((wallet) => ({
      address: currency,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [wallet],
    }));

    const balanceResults = await publicClient.multicall({
      contracts: balanceCalls,
    });

    return wallets.map((wallet, index) => ({
      walletAddress: wallet,
      balance: (balanceResults[index]?.result as bigint) || BigInt(0),
    }));
  }
}
