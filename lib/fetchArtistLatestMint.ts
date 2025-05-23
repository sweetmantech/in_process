import { Metadata } from "@/types/token";
import { VERCEL_OG } from "./og/consts";
import fetchTokenMetadata from "./fetchTokenMetadata";

const getArtistLatestMint = async (
  artistAddress: string,
  chainId: number,
): Promise<Metadata | null> => {
  try {
    const response = await fetch(
      `${VERCEL_OG}/api/artist/latest_mint?artistAddress=${artistAddress}&chainId=${chainId}`,
    );
    if (!response.ok) throw new Error("failed to get latest minted token.");
    const data = await response.json();
    if (!data.tokenContract || !data.tokenId)
      throw new Error("no moments yet.");
    const metadata = await fetchTokenMetadata(
      data.tokenContract,
      BigInt(data.tokenId).toString(),
    );
    return metadata;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getArtistLatestMint;
