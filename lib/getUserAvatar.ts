import { Address } from "viem";
import { VERCEL_OG } from "./consts";

const getUserAvatar = async (address: Address) => {
  try {
    const response = await fetch(
      `${VERCEL_OG}/api/profile/avatar?walletAddress=${address}`,
    );
    const data = await response.json();
    return (
      data || "https://arweave.net/aoRbQVsNJnSdhkwDErFT1Zb0gDJ-M6SBEU0gouifnqo"
    );
  } catch (error) {
    console.error(error);
    return "https://arweave.net/aoRbQVsNJnSdhkwDErFT1Zb0gDJ-M6SBEU0gouifnqo";
  }
};

export default getUserAvatar;
