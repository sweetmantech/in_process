import { Address } from "viem";
import {
  CHAIN_ID,
  MULTICALL3_ADDRESS,
  UNISWAP_ROUTER_ADDRESS,
} from "../consts";
import { erc20MinterAddresses } from "../protocolSdk/constants";
import { USDC_TOKEN, WETH_TOKEN } from "../tokens";
import getERC20MintCall from "./getERC20MintCall";
import getSwapCall from "./getSwapCall";
import getUsdcApprovalCall from "./getUsdcApprovalCall";
import getWETHApprovalCall from "./getWETHApprovalCall";

const getSwapAndMintMulticallCalls = (
  signedAddress: Address,
  collection: Address,
  tokenId: bigint,
  comment: string,
  price: bigint,
  amountInMaximum: bigint,
  sqrtPriceLimitX96: bigint,
) => {
  const wethApprovalCall = getWETHApprovalCall(amountInMaximum);
  const swapCall = getSwapCall(
    WETH_TOKEN.address as Address,
    USDC_TOKEN.address as Address,
    MULTICALL3_ADDRESS,
    price,
    amountInMaximum,
    sqrtPriceLimitX96,
  );
  const usdcApproveCall = getUsdcApprovalCall(erc20MinterAddresses[CHAIN_ID]);
  const erc20MintCall = getERC20MintCall(
    signedAddress as Address,
    tokenId,
    collection,
    price,
    USDC_TOKEN.address as Address,
    signedAddress as Address,
    comment,
  );

  const calls = [
    {
      target: WETH_TOKEN.address as Address,
      value: BigInt(0),
      callData: wethApprovalCall,
      allowFailure: false,
    },
    {
      target: UNISWAP_ROUTER_ADDRESS,
      value: amountInMaximum,
      callData: swapCall,
      allowFailure: false,
    },
    {
      target: USDC_TOKEN.address,
      value: BigInt(0),
      callData: usdcApproveCall,
      allowFailure: false,
    },
    {
      target: erc20MinterAddresses[CHAIN_ID] as Address,
      value: BigInt(0),
      callData: erc20MintCall,
      allowFailure: false,
    },
  ];

  return calls;
};

export default getSwapAndMintMulticallCalls;
