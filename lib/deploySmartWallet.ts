import { Account, Address, createWalletClient, http } from "viem";
import { CHAIN } from "./consts";
import { getPublicClient } from "./viem/publicClient";

const deploySmartWallet = async (
  admin: Account,
  fatoryAddress: Address,
  factoryCalldata: Address,
) => {
  const walletClient = createWalletClient({
    account: admin,
    transport: http(CHAIN.rpcUrls.default.http[0]),
  });
  const hash = await walletClient.sendTransaction({
    to: fatoryAddress,
    account: admin,
    chain: CHAIN,
    data: factoryCalldata,
  });

  const publicClient = getPublicClient();
  await publicClient.waitForTransactionReceipt({ hash });

  return;
};

export default deploySmartWallet;
