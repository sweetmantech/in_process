import { Address } from "viem";

async function getZoraProfile(address: Address) {
  if (!address) return;
  const response = await fetch(
    `https://zora.co/api/trpc/profile.getProfile?input={"json":"${address}"}`,
  );
  if (!response.ok) return null;
  const data = await response.json();
  return data.result.data.json;
}

export default getZoraProfile;
