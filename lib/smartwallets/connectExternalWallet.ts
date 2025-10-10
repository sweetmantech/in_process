import { Address } from "viem";

const connectExternalWallet = async (account: Address, external_wallet: Address) => {
  const response = await fetch(`/api/smartwallet/connect`, {
    method: "POST",
    body: JSON.stringify({
      account,
      external_wallet,
    }),
  });
  const data = await response.json();
  return data;
};

export default connectExternalWallet;
