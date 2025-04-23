import { encodeFunctionData } from "viem";
import { UNISWAP_ROUTER_ADDRESS } from "../consts";
import { wethABI } from "../abis/wethABI";

const getWETHApprovalCall = (amountInMaximum: bigint) => {
  const wethApprovalCall = encodeFunctionData({
    functionName: "approve",
    args: [UNISWAP_ROUTER_ADDRESS, amountInMaximum],
    abi: wethABI as any,
  });

  return wethApprovalCall;
};

export default getWETHApprovalCall;
