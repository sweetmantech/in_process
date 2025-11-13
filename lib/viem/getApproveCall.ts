import { encodeFunctionData, erc20Abi, parseUnits } from "viem";
import { CHAIN_ID, USDC_ADDRESS } from "../consts";
import { erc20MinterAddresses } from "../protocolSdk/constants";

const getApproveCall = (totalPrice: number) => {
  return {
    to: USDC_ADDRESS,
    data: encodeFunctionData({
      abi: erc20Abi,
      functionName: "approve",
      args: [erc20MinterAddresses[CHAIN_ID], parseUnits(totalPrice.toString(), 6)],
    }),
  };
};

export default getApproveCall;
