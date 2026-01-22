import { Address } from "viem";

export interface WithdrawApiParams {
  accessToken: string;
  amount: string;
  currency: Address;
  to: Address;
  chainId: number;
}

export interface WithdrawApiResult {
  hash: string;
  chainId: number;
}

export async function withdrawApi({
  accessToken,
  amount,
  currency,
  to,
  chainId,
}: WithdrawApiParams): Promise<WithdrawApiResult> {
  const response = await fetch("/api/smartwallet/withdraw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      amount,
      currency,
      to,
      chainId,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to withdraw");
  }

  return data;
}
