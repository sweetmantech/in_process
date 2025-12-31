export interface AirdropItem {
  address: string;
  status: "validating" | "invalid" | "valid";
  ensName: string;
}
