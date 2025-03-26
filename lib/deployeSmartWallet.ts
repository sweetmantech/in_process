import { Account, Address, createWalletClient, http } from "viem";
import { CHAIN } from "./consts";
import { getPublicClient } from "./viem/publicClient";

const deploySmartWallet = async (
  owner: Account,
  to: Address,
  calldata: Address,
) => {
  const walletClient = createWalletClient({
    account: owner,
    transport: http(CHAIN.rpcUrls.default.http[0]),
  });
  const hash = await walletClient.sendTransaction({
    account: owner,
    to,
    data: calldata,
    chain: CHAIN,
  });
  const publicClient = getPublicClient();
  await publicClient.waitForTransactionReceipt({ hash });

  return;
};

export default deploySmartWallet;
