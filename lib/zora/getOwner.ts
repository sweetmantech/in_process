import { Address } from "viem";
import { getPublicClient } from "../viem/publicClient";

const abi = [
  {
    type: "function",
    inputs: [],
    name: "owner",
    outputs: [{ name: "", internalType: "address", type: "address" }],
    stateMutability: "view",
  },
];
const getOwner = async (collection: Address) => {
  try {
    const publicClient = getPublicClient();
    const owner = await publicClient.readContract({
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
