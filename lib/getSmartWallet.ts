import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import {
  Coinbase,
  createSmartWallet,
  SmartWallet,
} from "@coinbase/coinbase-sdk";
import { CHAIN_ID } from "./consts";

Coinbase.configure(JSON.parse(process.env.COINBASE_CONFIGURATION as string));

async function getSmartWallet(): Promise<SmartWallet | null> {
  try {
    const owner = privateKeyToAccount(generatePrivateKey());
    const wallet = await createSmartWallet({
      signer: owner,
    });
    wallet.useNetwork({
      chainId: CHAIN_ID,
    });
    return wallet;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getSmartWallet;
