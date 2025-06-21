import { Address } from "viem";

export interface Moment {
  owner: Address;
  tokenContract: Address;
  tokenId: string;
}

/**
 * Toggles the hidden state of a timeline moment by calling the hide API
 * @param moment - The moment to toggle
 * @returns Promise that resolves when the API call completes
 */
export const toggleMoment = async (moment: Moment): Promise<void> => {
  await fetch("/api/token/hide", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ moment }),
  });
};