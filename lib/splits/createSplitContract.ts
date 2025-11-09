import { CreateSplitV2Config } from "@0xsplits/splits-sdk";
import { Address, Hash } from "viem";
import { getSplitsClient } from "./getSplitsClient";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";

export const createSplitContract = async (
  splitConfig: CreateSplitV2Config,
  account: Address
): Promise<Hash> => {
  const publicClient = getPublicClient(CHAIN_ID);
  const splitsClient = getSplitsClient({
    chainId: CHAIN_ID,
    publicClient,
  });

  // Get split creation call data
  const { data, address } = await splitsClient.callData.createSplit(splitConfig);

  // Create smart wallet for the account
  const smartAccount = await getOrCreateSmartWallet({
    address: account,
  });

  // Send transaction via smart wallet
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: [
      {
        to: address as Address,
        data,
      },
    ],
  });

  return transaction.transactionHash as Hash;
};
