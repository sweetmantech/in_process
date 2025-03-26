import { createSmartWallet, SmartWallet } from "@coinbase/coinbase-sdk";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { CHAIN_ID } from "./consts";
import { Coinbase } from "@coinbase/coinbase-sdk";

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
