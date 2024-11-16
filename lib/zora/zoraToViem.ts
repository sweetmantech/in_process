export const ZORA_TO_VIEM = {
  arb: "arbitrum",
  base: "base",
  blast: "blast",
  eth: "mainnet",
  oeth: "optimism",
  pgn: "pgn",
  zora: "zora",
} as const;

export type ZoraChains = keyof typeof ZORA_TO_VIEM;
