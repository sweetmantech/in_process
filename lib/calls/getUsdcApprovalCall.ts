import { Address, encodeFunctionData, erc20Abi, maxUint256 } from "viem";

const getUsdcApprovalCall = (spendar: Address) => {
  const usdcApprovalCall = encodeFunctionData({
    functionName: "approve",
    args: [spendar, maxUint256],
    abi: erc20Abi as any,
  });

  return usdcApprovalCall;
};

export default getUsdcApprovalCall;
