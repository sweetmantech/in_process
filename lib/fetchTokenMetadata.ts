import { MomentMetadata } from "@/types/moment";
import { IN_PROCESS_API } from "./consts";

const fetchTokenMetadata = async (
  tokenContract: string,
  tokenId: string
): Promise<MomentMetadata | null> => {
  try {
    const response = await fetch(
      `${IN_PROCESS_API}/token/metadata?tokenId=${BigInt(tokenId).toString()}&collection=${tokenContract}`
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
