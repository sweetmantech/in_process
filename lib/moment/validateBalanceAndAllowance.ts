import { Address, formatUnits } from "viem";
import { MomentSaleConfig } from "@/types/moment";
import { CHAIN_ID } from "@/lib/consts";
import { erc20MinterAddresses } from "@/lib/protocolSdk/constants";
import getUsdcBalance from "@/lib/balance/getUsdcBalance";
import getEthBalance from "@/lib/balance/getEthBalance";
import getAllowance from "@/lib/viem/getAllowance";
import getApproveCall from "@/lib/viem/getApproveCall";
import { MomentType } from "@/types/moment";

/**
 * Validates balance and checks allowance for moment collection.
 * Returns approve calls if insufficient allowance for USDC mints.
 */
export async function validateBalanceAndAllowance(
  address: Address,
  saleConfig: MomentSaleConfig,
  amount: number
) {
  const approveCall = [];
  const isErc20Mint = saleConfig.type === MomentType.Erc20Mint;

  if (isErc20Mint) {
    const balance = await getUsdcBalance(address);
    const pricePerToken = formatUnits(BigInt(saleConfig.pricePerToken), 6);
    const totalPrice = Number(pricePerToken) * amount;
    if (totalPrice > Number(balance)) throw Error("Insufficient balance.");

    const allowance: string = await getAllowance(address, erc20MinterAddresses[CHAIN_ID]);
    if (Number(allowance) < totalPrice) {
      approveCall.push(getApproveCall(totalPrice));
    }
  } else {
    const ethBalanceWei: bigint = await getEthBalance(address);
    const totalPriceWei = BigInt(saleConfig.pricePerToken) * BigInt(amount);
    if (totalPriceWei > ethBalanceWei) throw Error("Insufficient balance.");
  }

  return approveCall;
}
