import { NextRequest } from "next/server";
import { Address, formatEther, formatUnits } from "viem";
import getCorsHeader from "@/lib/getCorsHeader";
import { getSocialSmartWalletsBalances } from "@/lib/smartwallets/getSocialSmartWalletsBalances";

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
    const artistAddressParam = searchParams.get("artist_address");
    const chainIdParam = searchParams.get("chainId");

    if (!artistAddressParam) {
      return Response.json(
        { message: "artist_address parameter is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const artistAddress = artistAddressParam.toLowerCase() as Address;

    let chainId = 8453;
    if (chainIdParam) {
      const parsedChainId = parseInt(chainIdParam, 10);
      if (isNaN(parsedChainId)) {
        return Response.json(
          { message: "chainId must be a valid integer" },
          { status: 400, headers: corsHeaders }
        );
      }
      chainId = parsedChainId;
    }

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
