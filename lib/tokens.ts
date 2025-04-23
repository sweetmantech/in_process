import { Token, ChainId } from "@uniswap/sdk-core";
export const WETH_TOKEN = new Token(
  ChainId.BASE,
  "0x4200000000000000000000000000000000000006",
  18,
  "WETH",
  "Wrapped Ether",
);

export const USDC_TOKEN = new Token(
  ChainId.BASE,
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  6,
  "USDC",
  "USD//C",
);
