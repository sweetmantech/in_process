import {
  createSmartWallet,
  SmartWallet,
  toSmartWallet,
  Wallet,
} from "@coinbase/coinbase-sdk";
import { Address } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { CHAIN_ID } from "./consts";
import { Coinbase } from "@coinbase/coinbase-sdk";

Coinbase.configure({
  ...JSON.parse(process.env.COINBASE_CONFIGURATION as string),
  debugging: true
});

async function getSmartWallet(): Promise<any> {
  try {
    let wallet: SmartWallet | null = null;
    const owner = privateKeyToAccount(process.env.PRIVATE_KEY as Address);
    const response = await fetch(
      `https://api.wallet.coinbase.com/rpc/v3/scw/getAccountMetadata?eoaAddress=${owner.address}`,
    );

    const data = await response.json();

    if (data?.accounts?.[0]?.baseContractAddress) {
      wallet = toSmartWallet({
        smartWalletAddress: data?.accounts?.[0]?.baseContractAddress,
        signer: owner,
      });
    } else {
      wallet = await createSmartWallet({
        signer: owner,
      });
    }
    wallet.useNetwork({
      chainId: CHAIN_ID,
      paymasterUrl: process.env.PAYMASTER_URL as string
    });
    return wallet;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getSmartWallet;
