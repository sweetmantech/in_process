import truncateAddress from "../truncateAddress";
import { Address } from "viem";

async function getZoraProfile(address: Address) {
  if (!address) return;
  const response = await fetch(
    `https://zora.co/api/trpc/profile.getProfile?input={"json":"${address}"}`,
  );
  if (!response.ok)
    return {
      displayName: truncateAddress(address),
      avatarUri: null,
      description: null,
      website: null,
      socialAccounts: {
        twitter: null,
        farcaster: null,
        tiktok: null,
        instagram: null,
      },
    };
  const data = await response.json();
  return data.result.data.json;
}

export default getZoraProfile;
