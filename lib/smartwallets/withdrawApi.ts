import { Address } from "viem";
import { Currency } from "@/types/balances";
import { IN_PROCESS_API } from "@/lib/consts";

export interface WithdrawApiParams {
  accessToken: string;
  amount: string;
  currency: Currency;
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
  const response = await fetch(`${IN_PROCESS_API}/smartwallet/withdraw`, {
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
