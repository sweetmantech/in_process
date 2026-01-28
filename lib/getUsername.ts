import { Address } from "viem";
import truncateAddress from "./truncateAddress";
import { IN_PROCESS_API } from "./consts";

const getUsername = async (address: Address) => {
  try {
    const response = await fetch(`${IN_PROCESS_API}/profile?walletAddress=${address}`);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return data.username || truncateAddress(address);
  } catch (error) {
    console.error(error);
    return truncateAddress(address);
  }
};

export default getUsername;
