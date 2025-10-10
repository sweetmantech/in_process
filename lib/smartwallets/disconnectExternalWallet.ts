import { Address } from "viem";

const disconnectExternalWallet = async (smart_wallet: Address, external_wallet: Address) => {
  const response = await fetch(`/api/smartwallet/disconnect`, {
    method: "POST",
    body: JSON.stringify({
      smart_wallet,
      external_wallet,
    }),
  });
  const data = await response.json();
  return data;
};

export default disconnectExternalWallet;
