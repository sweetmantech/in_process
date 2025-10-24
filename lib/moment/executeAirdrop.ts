import { Address } from "viem";
import getPermission from "@/lib/zora/getPermission";
import { PERMISSION_BIT_ADMIN } from "@/lib/consts";

export interface AirdropRecipient {
  recipientAddress: string;
  tokenId: string;
}

export interface ExecuteAirdropParams {
  airdropToItems: Array<{ address: string }>;
  tokenId: string;
  momentContract: Address;
  smartWallet: Address;
  artistWallet: Address;
  accessToken: string;
}

export const executeAirdrop = async ({
  airdropToItems,
  tokenId,
  momentContract,
  smartWallet,
  artistWallet,
  accessToken,
}: ExecuteAirdropParams) => {
  // Create recipients array from airdropToItems
  const recipients = Array.from({ length: airdropToItems.length }).map((_, i) => ({
    recipientAddress: airdropToItems[i].address,
    tokenId: tokenId,
  }));
  // Check smart wallet permissions
  const smartWalletPermission = await getPermission(momentContract, smartWallet);

  if (smartWalletPermission !== BigInt(PERMISSION_BIT_ADMIN)) {
    // Check artist wallet permissions as fallback
    const artistWalletPermission = await getPermission(momentContract, artistWallet);

    if (artistWalletPermission !== BigInt(PERMISSION_BIT_ADMIN)) {
      throw new Error("The account does not have admin permission for this collection.");
    } else {
      throw new Error("Admin permission are not yet granted to smart wallet.");
    }
  }

  // Execute airdrop API call
  const response = await fetch("/api/moment/airdrop", {
    method: "POST",
    body: JSON.stringify({
      recipients,
      momentContract,
    }),
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data.hash;
};
