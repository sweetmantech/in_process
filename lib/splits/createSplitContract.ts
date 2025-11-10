import { CreateSplitV2Config } from "@0xsplits/splits-sdk";
import { Address, Hash } from "viem";
import { getSplitsClient } from "./getSplitsClient";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { EvmSmartAccount } from "@coinbase/cdp-sdk";

export const createSplitContract = async (
  splitConfig: CreateSplitV2Config,
  smartAccount: EvmSmartAccount
): Promise<Hash> => {
  const publicClient = getPublicClient(CHAIN_ID);
  const splitsClient = getSplitsClient({
    chainId: CHAIN_ID,
    publicClient,
  });

  // Get split creation call data
  const { data, address } = await splitsClient.callData.createSplit(splitConfig);

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
