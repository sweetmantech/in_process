import { VERCEL_OG } from "./og/consts";

const getArtistLatestMint = async (
  artistAddress: string,
  chainId: number,
): Promise<{
  tokenId: string;
  tokenContract: string;
} | null> => {
  try {
    const response = await fetch(
      `${VERCEL_OG}/api/artist/latest_mint?artistAddress=${artistAddress}&chainId=${chainId}`,
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getArtistLatestMint;
