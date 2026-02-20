import { IN_PROCESS_API } from "@/lib/consts";

const fetchMetadata = async (uri: string) => {
  const response = await fetch(`${IN_PROCESS_API}/metadata?uri=${encodeURIComponent(uri)}`);

  if (!response.ok) throw new Error("failed to get metadata.");

  const data = await response.json();

  return data;
};

export default fetchMetadata;
