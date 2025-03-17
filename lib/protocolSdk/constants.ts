import { parseAbi } from "viem";

export const ZORA_API_BASE = "https://api.zora.co/";
export const OPEN_EDITION_MINT_SIZE = BigInt("18446744073709551615");

// Subgraph base settings
const SUBGRAPH_CONFIG_BASE =
  "https://api.goldsky.com/api/public/project_clhk16b61ay9t49vm6ntn4mkz/subgraphs";

export function getSubgraph(name: string, version: string): string {
  return `${SUBGRAPH_CONFIG_BASE}/${name}/${version}/gn`;
}

export const zora721Abi = parseAbi([
  "function mintWithRewards(address recipient, uint256 quantity, string calldata comment, address mintReferral) external payable",
  "function zoraFeeForAmount(uint256 amount) public view returns (address, uint256)",
] as const);

export const zora1155LegacyAbi = [
  {
    type: "function",
    name: "mintWithRewards",
    inputs: [
      {
        name: "minter",
        type: "address",
        internalType: "contract IMinter1155",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "quantity",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "minterArguments",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "mintReferral",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
] as const;

export const zoraCreatorFixedPriceSaleStrategyAddress = {
  1: "0x04E2516A2c207E84a1839755675dfd8eF6302F0a",
  10: "0x3678862f04290E565cCA2EF163BAeb92Bb76790C",
  999: "0x04E2516A2c207E84a1839755675dfd8eF6302F0a",
  8453: "0x2994762aA0E4C750c51f333C10d81961faEBE785",
  42161: "0x1Cd1C1f3b8B779B50Db23155F2Cb244FCcA06B21",
  81457: "0x3EB144aee170BF62FdA1536e38aF51f08e34A5D0",
  84532: "0x2994762aA0E4C750c51f333C10d81961faEBE785",
  421614: "0x1Cd1C1f3b8B779B50Db23155F2Cb244FCcA06B21",
  7777777: "0x04E2516A2c207E84a1839755675dfd8eF6302F0a",
  11155111: "0x1Cd1C1f3b8B779B50Db23155F2Cb244FCcA06B21",
  168587773: "0x3EB144aee170BF62FdA1536e38aF51f08e34A5D0",
  999999999: "0x6d28164C3CE04A190D5F9f0f8881fc807EAD975A",
} as const;
