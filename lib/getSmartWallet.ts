import {
  createSmartWallet,
  SmartWallet,
  toSmartWallet,
} from "@coinbase/coinbase-sdk";
import { Address } from "viem";
import { privateKeyToAccount } from "viem/accounts";

async function getSmartWallet(): Promise<SmartWallet | null> {
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
    } else
      wallet = await createSmartWallet({
        signer: owner,
      });
    return wallet;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getSmartWallet;
