// Fetches the first user or moment matching the searchKey from the /api/search endpoint

export type SearchMatrixByKeyResponse =
  | {
      type: "user";
      user: { address: string; username: string; bio: string | null };
    }
  | {
      type: "moment";
      moment: {
        tokenId: number;
        collection: string;
        name: string;
        image?: string;
      };
    }
  | { type: null };

/**
 * Calls the /api/search endpoint with the given searchKey.
 * Returns the first user or moment found, or null if none.
 */
export async function searchMatrixByKey(
  searchKey: string
): Promise<SearchMatrixByKeyResponse> {
  if (!searchKey) return { type: null };
  const res = await fetch(
    `/api/search?searchKey=${encodeURIComponent(searchKey)}`
  );
  if (!res.ok) return { type: null };
  return res.json();
}
