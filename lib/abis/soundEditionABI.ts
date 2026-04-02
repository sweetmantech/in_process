// ABI for SoundEditionV2_1 (OwnableRoles from Solady)
// ADMIN_ROLE = 1 << 0 = 1, callable only by the edition owner
export const soundEditionABI = [
  {
    name: "grantRoles",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "user", type: "address" },
      { name: "roles", type: "uint256" },
    ],
    outputs: [],
  },
] as const;
