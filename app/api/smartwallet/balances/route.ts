import { NextRequest } from "next/server";
import { Address, formatEther, formatUnits } from "viem";
import getCorsHeader from "@/lib/getCorsHeader";
import { getSocialSmartWalletsBalances } from "@/lib/smartwallets/getSocialSmartWalletsBalances";
import { getSmartWalletBalancesSchema } from "@/lib/schema/getSmartWalletBalancesSchema";
import { validate } from "@/lib/schema/validate";

const corsHeaders = getCorsHeader();

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = {
      artist_address: searchParams.get("artist_address"),
      chainId: searchParams.get("chainId"),
    };

    const validationResult = validate(getSmartWalletBalancesSchema, queryParams);
    if (!validationResult.success) {
      return validationResult.response;
    }

    const { artist_address: artistAddress, chainId } = validationResult.data;

    const { totalEthBalance, totalUsdcBalance, walletsBalances } =
      await getSocialSmartWalletsBalances(artistAddress, chainId);

    const balances = Array.from(walletsBalances.entries()).map(([socialWalletAddress, balance]) => {
      const smartWalletAddress = balance.smartAccount.address as Address;
      return {
        social_wallet: socialWalletAddress.toLowerCase(),
        smart_wallet: smartWalletAddress.toLowerCase(),
        eth_balance: formatEther(balance.ethBalance),
        usdc_balance: formatUnits(balance.usdcBalance, 6),
      };
    });

    const response = {
      balances,
      total_eth_balance: formatEther(totalEthBalance),
      total_usdc_balance: formatUnits(totalUsdcBalance, 6),
    };

    return Response.json(response, { headers: corsHeaders });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "Failed to get balances";
    return Response.json({ message }, { status: 500, headers: corsHeaders });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
