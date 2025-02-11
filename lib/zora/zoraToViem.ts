export const ZORA_TO_VIEM = {
  arb: "arbitrum",
  base: "base",
  blast: "blast",
  eth: "mainnet",
  oeth: "optimism",
  pgn: "pgn",
  zora: "zora",
  bsep: "baseSepolia",
} as const;

export type ZoraChains = keyof typeof ZORA_TO_VIEM;

// Create reverse mapping
export const VIEM_TO_ZORA = Object.entries(ZORA_TO_VIEM).reduce(
  (acc, [shortName, longName]) => ({
    ...acc,
    [longName]: shortName,
  }),
  {} as Record<(typeof ZORA_TO_VIEM)[ZoraChains], ZoraChains>,
);

// Additional mapping for special cases
const NETWORK_NAME_OVERRIDES: Record<string, string> = {
  "base sepolia": "baseSepolia",
};

/**
 * Get the short network name from the long name
 * @param longName - The long network name (e.g. "arbitrum", "base", "Base Sepolia")
 * @returns The short network name (e.g. "arb", "base", "bsep") or undefined if not found
 */
export const getShortNetworkName = (
  longName: string,
): ZoraChains | undefined => {
  // Normalize the input
  const normalizedName = longName.toLowerCase();

  // Check for special cases first
  const overriddenName = NETWORK_NAME_OVERRIDES[normalizedName];
  if (overriddenName) {
    return VIEM_TO_ZORA[overriddenName as keyof typeof VIEM_TO_ZORA];
  }

  // Default lookup
  return VIEM_TO_ZORA[normalizedName as keyof typeof VIEM_TO_ZORA];
};
