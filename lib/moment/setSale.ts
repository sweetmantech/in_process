import { IN_PROCESS_API } from "@/lib/consts";
import { Moment } from "@/types/moment";

export const setSale = async (
  accessToken: string,
  moment: Moment,
  saleStart: number,
  pricePerToken?: string
): Promise<{ hash: string; chainId: number }> => {
  const res = await fetch(`${IN_PROCESS_API}/moment/sale`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      moment: {
        tokenId: moment.tokenId,
        collectionAddress: moment.collectionAddress,
        chainId: moment.chainId,
      },
      saleStart,
      ...(pricePerToken !== undefined && { pricePerToken }),
    }),
  });
  if (!res.ok) throw new Error("Failed to update sale");
  return res.json();
};
