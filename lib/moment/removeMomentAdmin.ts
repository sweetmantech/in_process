import { Moment } from "@/types/moment";
import { Address } from "viem";

export interface RemoveMomentAdminInput {
  moment: Moment;
  adminAddress: Address;
  accessToken: string;
}

export interface RemoveMomentAdminResult {
  hash: string;
  chainId: number;
}

/**
 * Removes an admin permission from a Moment via the API.
 *
 * @param {RemoveMomentAdminInput} params - The admin details and context
 * @param {Moment} params.moment - The Moment object containing collection address and token ID
 * @param {Address} params.adminAddress - The address to remove admin permission from
 * @param {string} params.accessToken - The authentication token
 * @returns {Promise<RemoveMomentAdminResult>} The transaction hash and chain ID
 */
export async function removeMomentAdmin({
  moment,
  adminAddress,
  accessToken,
}: RemoveMomentAdminInput): Promise<RemoveMomentAdminResult> {
  const response = await fetch("/api/moment/permission", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      moment,
      adminAddress,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.message || "Failed to remove admin");
  }

  const result = await response.json();
  return result;
}
