import { Account, Address, createWalletClient, http } from "viem";
import { getPublicClient } from "./viem/publicClient";
import getChain from "./viem/getChain";

const deploySmartWallet = async (
  admin: Account,
  fatoryAddress: Address,
  factoryCalldata: Address,
  chainId: number,
) => {
  const chain = getChain(chainId);
  const walletClient = createWalletClient({
    account: admin,
    transport: http(chain.rpcUrls.default.http[0]),
  });
  const hash = await walletClient.sendTransaction({
    to: fatoryAddress,
    account: admin,
    chain,
    data: factoryCalldata,
  });

  const publicClient = getPublicClient();
  await publicClient.waitForTransactionReceipt({ hash });

  return;
};

export default deploySmartWallet;
