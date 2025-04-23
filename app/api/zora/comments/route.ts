
import { fetchTokenData } from "@/lib/zora/getComments";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const tokenContract = req.nextUrl.searchParams.get("tokenContract");
  const tokenId = req.nextUrl.searchParams.get("tokenId");
  const API_ENDPOINT = "https://api.zora.co/graphql/";
  const IPFS_GATEWAY = "https://magic.decentralized-content.com/ipfs/";

  const data = await fetchTokenData(
    API_ENDPOINT,
    IPFS_GATEWAY,
    tokenContract as string,
    "BASE",
    "BASE_MAINNET",
    100,
    null
  )
  try {
    
    return Response.json(
      data
    );
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Dune transactions";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
