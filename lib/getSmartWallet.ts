import { Address, zeroAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import {
  Coinbase,
  createSmartWallet,
  SmartWallet,
  toSmartWallet,
} from "@coinbase/coinbase-sdk";
import { CHAIN_ID } from "./consts";

Coinbase.configure(JSON.parse(process.env.COINBASE_CONFIGURATION as string));

async function getSmartWallet(): Promise<SmartWallet | null> {
  try {
    let wallet: SmartWallet | null;

    const privatekey = process.env.PRIVATE_KEY as Address;
    const owner = privateKeyToAccount(privatekey);
    const response = await fetch(
      `https://api.wallet.coinbase.com/rpc/v3/scw/getAccountMetadata?eoaAddress=${owner.address}`,
    );
    const data = await response.json();
    const smartWallet = data?.accounts?.[0];

    if (smartWallet?.baseContractAddress) {
      wallet = toSmartWallet({
        signer: owner,
        smartWalletAddress: smartWallet?.baseContractAddress,
      });
    } else {
      wallet = await createSmartWallet({
        signer: owner,
      });
      wallet.sendUserOperation({
        calls: [
          {
            to: zeroAddress,
            data: "0x",
          },
        ],
        chainId: CHAIN_ID,
        paymasterUrl: process.env.PAYMASTER_URL,
      });
    }

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
