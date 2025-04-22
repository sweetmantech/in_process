import { erc20MinterABI } from "@zoralabs/protocol-deployments";
import { Address, encodeFunctionData } from "viem";

const getERC20MintCall = (
  mintTo: Address,
  tokenId: bigint,
  collectionAddress: Address,
  price: bigint,
  erc20Address: Address,
  referral: Address,
  comment: string,
) => {
  const ercMintCall = encodeFunctionData({
    abi: erc20MinterABI,
    functionName: "mint",
    args: [
      mintTo,
      BigInt(1),
      collectionAddress,
      tokenId,
      price,
      erc20Address,
      referral,
      comment,
    ],
  });

  return ercMintCall;
};

export default getERC20MintCall;
