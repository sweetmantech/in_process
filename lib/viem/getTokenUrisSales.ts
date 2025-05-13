import { getPublicClient } from "./publicClient";
import { Token } from "@/types/token";
import getERC20SaleConfigCall from "../calls/getErc20SaleConfigCall";
import getFixedPriceSaleConfigCall from "../calls/getFixedPriceSaleConfigCall";
import getUriCall from "../calls/getUriCall";

export async function getTokenUrisSales(feeds: Token[]): Promise<Token[]> {
  try {
    const groupedFeedByNetwork = feeds.reduce(
      (acc: { [network: string]: Token[] }, item: Token) => {
        const network = item.chainId;
        if (!acc[network]) {
          acc[network] = [];
        }
        acc[network].push(item);
        return acc;
      },
      {},
    );
    const promise = Object.entries(groupedFeedByNetwork).map(
      async ([chainId, tokens]) => {
        const publicClient = getPublicClient(parseInt(chainId, 10));
        const calls = tokens.map((t: Token) => {
          const erc20SaleConfigCall = getERC20SaleConfigCall(
            t.collection,
            t.tokenId,
            parseInt(chainId, 10),
          );
          const fixedPriceSaleConfigCall = getFixedPriceSaleConfigCall(
            t.collection,
            t.tokenId,
            parseInt(chainId, 10),
          );
          const uriCall = getUriCall(t.collection, t.tokenId);
          return [erc20SaleConfigCall, fixedPriceSaleConfigCall, uriCall];
        });
        const multicalls = calls.flat();
        const result: any = await publicClient.multicall({
          contracts: multicalls as any,
        });
        return tokens.map((t: Token, i: number) => ({
          ...t,
          uri: result[3 * i + 2].result as string,
          released_at:
            parseInt(
              (
                (result[3 * i + 1].result?.saleStart || BigInt(0)) +
                (result[3 * i + 2].result?.saleStart || BigInt(0))
              ).toString(),
              10,
            ) * 1000 || t.released_at,
          created_at: t.released_at,
        }));
      },
    );
    const tokens = await Promise.all(promise);
    return tokens.flat();
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
}
