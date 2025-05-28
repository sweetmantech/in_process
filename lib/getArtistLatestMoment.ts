import { Metadata } from "@/types/token";
import { VERCEL_OG } from "./og/consts";
import fetchTokenMetadata from "./fetchTokenMetadata";

const getArtistLatestMoment = async (
  artistAddress: string,
  chainId: number,
): Promise<Metadata | null> => {
  try {
    const response = await fetch(
      `${VERCEL_OG}/api/collections?artistAddress=${artistAddress}&chainId=${chainId}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({}),
      },
    );
    if (!response.ok) throw new Error("failed to get latest created moment.");
    const data = await response.json();
    if (!data.collections.length) throw new Error("no moments yet.");
    const metadata = await fetchTokenMetadata(
      data.collections[0].newContract,
      BigInt(1).toString(),
    );
    return metadata;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getArtistLatestMoment;
