import { Address } from "viem";
import { getPublicClient } from "../viem/publicClient";

const abi = [
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
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
