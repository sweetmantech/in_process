import { NextRequest } from "next/server";
import getAlchemyRpcUrl from "@/lib/alchemy/getAlchemyRpcUrl";

export async function GET(req: NextRequest) {
  try {
    const artistAddress = req.nextUrl.searchParams.get("artistAddress");
    const chainId = req.nextUrl.searchParams.get("chainId");
    const chainIdNum = parseInt(chainId as string, 10);

    const endpoint = getAlchemyRpcUrl(chainIdNum);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 0,
        method: "alchemy_getAssetTransfers",
        params: [
          {
            toBlock: "latest",
            excludeZeroValue: true,
            category: ["erc1155"],
            fromAddress: "0x0000000000000000000000000000000000000000",
            toAddress: artistAddress as string,
            order: "desc",
          },
        ],
      }),
    };
    const response = await fetch(endpoint, options);
    const data = await response.json();

    for (const events of data.result.transfers) {
      if (events.erc1155Metadata) {
        for (const erc1155 of events.erc1155Metadata) {
          return Response.json({
            tokenId: erc1155.tokenId,
            tokenContract: events.rawContract.address,
            hash: events.hash,
          });
        }
      }
    }

    return Response.json({
      tokenContract: "",
      tokenId: "",
      hash: "",
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get collections";
    return Response.json({ message }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
