import { type User } from "@privy-io/node";

export async function getWalletUsers(): Promise<User[]> {
  const url = "https://api.privy.io/v1/users";
  const options = {
    method: "GET",
    headers: {
      "privy-app-id": process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
      Authorization: `Basic ${btoa(process.env.NEXT_PUBLIC_PRIVY_APP_ID! + ":" + process.env.PRIVY_API_KEY!)}`,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch Privy users: ${response.statusText}`);
  }

  const data = await response.json();

  const users: User[] = data.data || [];

  return users;
}
