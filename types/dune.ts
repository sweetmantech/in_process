import { Address } from "viem";

export type DuneDecodedEvent = {
  chain: string;
  chain_id: number;
  address: Address;
  block_time: string;
  block_number: number;
  index: number;
  hash: string;
  block_hash: string;
  value: string;
  transaction_type: "Sender" | "Receiver";
  from: Address;
  to: Address;
  nonce: string;
  gas_price: string;
  gas_used: string;
  effective_gas_price: string;
  success: boolean;
  data: string;
  decoded: {
    name: string;
    inputs: Array<{
      name: string;
      type: string;
      value: string | Array<string>;
    }>;
  };
  logs: Array<{
    address: Address;
    data: string;
    topics: Array<string>;
    decoded: {
      name: string;
      inputs: Array<{
        name: string;
        type: string;
        value: string | Array<string>;
      }>;
    };
  }>;
};
