import convertIpfsToHttp from "@/lib/ipfs/convertIpfsToHttp";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchIpfs = async (tokenUri: string): Promise<any> => {
  try {
    const url = convertIpfsToHttp(tokenUri);
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch metadata");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    return {};
  }
};

export default fetchIpfs;
