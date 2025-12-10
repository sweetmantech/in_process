import { NextRequest } from "next/server";
import { selectPayments } from "@/lib/supabase/in_process_payments/selectPayments";
import { Address } from "viem";
import getSmartWalletAddress from "@/lib/smartwallets/getSmartWalletAddress";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Parse query parameters
  const limit = Math.min(Number(searchParams.get("limit")) || 20, 100);
  const page = Number(searchParams.get("page")) || 1;
  const artist = searchParams.get("artist")?.toLowerCase() || undefined;
  const collector = searchParams.get("collector")?.toLowerCase() || undefined;
  const chainId = searchParams.get("chainId") ? Number(searchParams.get("chainId")) : undefined;

  try {
    const collectors: string[] = [];
    if (collector) {
      const collectorSmartWallet = await getSmartWalletAddress(collector as Address);
      collectors.push(collectorSmartWallet);
      collectors.push(collector);
    }

    const artists: string[] = [];
    if (artist) {
      const artistSmartWallet = await getSmartWalletAddress(artist as Address);
      artists.push(artistSmartWallet);
      artists.push(artist);
    }

    const { data, error } = await selectPayments({
      limit,
      page,
      artists,
      collectors,
      chainId,
    });

    if (error) {
      return Response.json(
        {
          status: "error",
          message: error.message,
        },
        { status: 500 }
      );
    }

    return Response.json({
      status: "success",
      payments: data || [],
    });
  } catch (error) {
    console.error("Error selecting payments:", error);
    return Response.json(
      {
        status: "error",
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
