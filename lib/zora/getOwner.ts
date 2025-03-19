import { Address, createPublicClient, http, PublicClient } from "viem";
import { base } from "viem/chains";

const abi = [
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
];
const getOwner = (collection: Address) => {
  try {
    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    }) as PublicClient;

    const owner = publicClient.readContract({
      address: collection,
      abi,
      functionName: "owner",
    });

    return owner;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default getOwner;
