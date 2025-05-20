import { Address } from "viem";
import truncateAddress from "./truncateAddress";
import { VERCEL_OG } from "./og/consts";

const getUsername = async (address: Address) => {
  try {
    const response = await fetch(
      `${VERCEL_OG}/api/profile?walletAddress=${address}`,
    );
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data.username || truncateAddress(address);
  } catch (error) {
    console.error(error);
    return truncateAddress(address);
  }
};

export default getUsername;
