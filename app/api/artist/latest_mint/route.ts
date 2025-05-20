import { NextRequest } from "next/server";
import { Alchemy, AssetTransfersCategory, Network } from "alchemy-sdk";
import { zeroAddress } from "viem";

export async function GET(req: NextRequest) {
  try {
    const artistAddress = req.nextUrl.searchParams.get("artistAddress");
    const config = {
      apiKey: "bm4Vy0AOr33hIewRojery5TXIHWcD1zT",
      network: Network.BASE_MAINNET,
    };
    const alchemy = new Alchemy(config);

    const res = await alchemy.core.getAssetTransfers({
      toBlock: "latest",
      fromAddress: zeroAddress,
      toAddress: artistAddress as string,
      excludeZeroValue: true,
      category: [AssetTransfersCategory.ERC1155],
    });

    for (const events of res.transfers) {
      if (events.erc1155Metadata) {
        for (const erc1155 of events.erc1155Metadata) {
          return Response.json({
            tokenId: erc1155.tokenId,
            tokenContract: events.rawContract.address,
          });
        }
      }
    }

    return Response.json(
      {
        message: "There are no mint events yet.",
      },
      { status: 204 },
    );
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get collections";
    return Response.json({ message }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
