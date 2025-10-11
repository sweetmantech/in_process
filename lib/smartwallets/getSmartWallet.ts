import { Address } from "viem";

const getSmartWallet = async (account: Address) => {
  const response = await fetch(`/api/smartwallet/get?address=${account}`);
  const data = await response.json();
  return data.address;
};

export default getSmartWallet;
