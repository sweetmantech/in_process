// ABI for CatalogRelease1155 (PermissionController)
// AUTH_SCOPE_ARTIST = 1 << 1 = 2, callable by OWNER or ARTIST
export const catalogReleaseABI = [
  {
    name: "setContractAuthScope",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_user", type: "address" },
      { name: "_authScope", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "setTokenAuthScope",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "_tokenId", type: "uint256" },
      { name: "_user", type: "address" },
      { name: "_authScope", type: "uint256" },
    ],
    outputs: [],
  },
] as const;
