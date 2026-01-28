import { Moment } from "@/types/moment";
import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";

export interface AddMomentAdminInput {
  moment: Moment;
  adminAddress: Address;
  accessToken: string;
}

export interface AddMomentAdminResult {
  hash: string;
  chainId: number;
}

/**
 * Adds an admin permission to a Moment via the API.
 *
 * @param {AddMomentAdminInput} params - The admin details and context
 * @param {Moment} params.moment - The Moment object containing collection address and token ID
 * @param {Address} params.adminAddress - The address to grant admin permission to
 * @param {string} params.accessToken - The authentication token
 * @returns {Promise<AddMomentAdminResult>} The transaction hash and chain ID
 */
export async function addMomentAdmin({
  moment,
  adminAddress,
  accessToken,
}: AddMomentAdminInput): Promise<AddMomentAdminResult> {
  const response = await fetch(`${IN_PROCESS_API}/moment/permission`, {
    method: "POST",
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
    throw new Error(error.error || error.message || "Failed to add admin");
  }

  const result = await response.json();
  return result;
}
