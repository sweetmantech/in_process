import { Address } from "viem";

const getExternalWallet = async (smartWalletAddress: Address) => {
  const response = await fetch(
    `/api/smartwallet/get/externalwallet?smart_wallet=${smartWalletAddress}`
  );
  const data = await response.json();
  return data.address;
};

export default getExternalWallet;
