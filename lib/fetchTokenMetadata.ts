import { Metadata } from "@/types/token";
import { VERCEL_OG } from "./og/consts";

const fetchTokenMetadata = async (
  tokenContract: string,
  tokenId: string,
): Promise<Metadata | null> => {
  try {
    const response = await fetch(
      `${VERCEL_OG}/api/token/metadata?tokenId=${BigInt(tokenId).toString()}&collection=${tokenContract}`,
    );
    if (!response.ok) throw new Error("failed to get token metadata");
    const data = await response.json();
    return data.metadata;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchTokenMetadata;
