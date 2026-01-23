import { Address, erc20Abi } from "viem";
import { getPublicClient } from "@/lib/viem/publicClient";
import { createPublicClient, http } from "viem";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import getAlchemyRpcUrl from "@/lib/alchemy/getAlchemyRpcUrl";
import getUsdcAddress from "@/lib/getUsdcAddress";
import { EvmSmartAccount } from "@coinbase/cdp-sdk";

export interface WalletBalance {
  usdcBalance: bigint;
  ethBalance: bigint;
  smartAccount: EvmSmartAccount;
}

async function getSmartWalletsBalances(
  wallets: EvmSmartAccount[],
  chainId: number
): Promise<{
  totalEthBalance: bigint;
  totalUsdcBalance: bigint;
  walletsBalances: Map<Address, WalletBalance>;
}> {
  const batchedClient = createPublicClient({
    chain: getViemNetwork(chainId) as any,
    transport: http(getAlchemyRpcUrl(chainId), {
      batch: {
        wait: 0, // Batch all calls made in the same event loop tick
      },
    }),
  });

  const publicClient = getPublicClient(chainId);

  const [ethBalances, erc20BalanceResults] = await Promise.all([
    Promise.all(
      wallets.map((wallet) => batchedClient.getBalance({ address: wallet.address as Address }))
    ),
    publicClient.multicall({
      contracts: wallets.map((wallet) => ({
        address: getUsdcAddress(chainId),
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [wallet.address as Address],
      })),
    }),
  ]);

  const balancesMap = new Map<Address, WalletBalance>();

  let totalEthBalance = BigInt(0);
  let totalUsdcBalance = BigInt(0);
  wallets.forEach((wallet, index) => {
    const walletAddress = wallet.address as Address;
    totalEthBalance += ethBalances[index];
    totalUsdcBalance += (erc20BalanceResults[index]?.result as bigint) || BigInt(0);
    balancesMap.set(walletAddress, {
      ethBalance: ethBalances[index],
      usdcBalance: (erc20BalanceResults[index]?.result as bigint) || BigInt(0),
      smartAccount: wallet,
    });
  });

  return {
    totalEthBalance,
    totalUsdcBalance,
    walletsBalances: balancesMap,
  };
}

export default getSmartWalletsBalances;
