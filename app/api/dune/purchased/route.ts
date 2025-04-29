import getPurchasedEvents from "@/lib/dune/getPurchasedEvents";
import { DuneDecodedEvent } from "@/types/dune";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const tokenContract = req.nextUrl.searchParams.get("tokenContract");
  try {
    const purchasedEvents: DuneDecodedEvent[] = await getPurchasedEvents(
      tokenContract as string,
    );

    return Response.json(purchasedEvents);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Dune transactions";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
