import { Address } from "viem";

interface SmartWalletAccount {
  accounts: Array<{
    baseContractAddress: Address;
    deploymentMeta: {
      factoryAddress: Address;
      entrypointAddress: Address;
      factoryCalldata: Address;
    };
  }>;
}

async function getSmartWallet(
  eoaAddress: Address,
): Promise<SmartWalletAccount | null> {
  try {
    const response = await fetch(
      `https://api.wallet.coinbase.com/rpc/v3/scw/getAccountMetadata?eoaAddress=${eoaAddress}`,
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default getSmartWallet;
