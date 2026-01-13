export interface AirdropItem {
  address: string;
  status: "validating" | "invalid" | "valid";
  ensName: string;
}

export interface AirdropResponse {
  recipient: {
    address: string;
    username: string | null;
  };
  amount: number;
}

export interface AirdropRecipient {
  address: string;
  username: string | null;
}
