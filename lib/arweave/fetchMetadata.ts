import { IN_PROCESS_API } from "../consts";

const fetchMetadata = async (uri: string) => {
  const response = await fetch(`${IN_PROCESS_API}/metadata?uri=${encodeURIComponent(uri)}`, {
    cache: "no-store",
  });

  if (!response.ok) throw new Error("failed to get metadata.");

  const data = await response.json();

  return data;
};

export default fetchMetadata;
