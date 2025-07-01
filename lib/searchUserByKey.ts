// Fetches the first user matching the searchKey from the /api/user/search endpoint

import { User } from "@/types/token";

export type SearchUserByKeyResponse =
  | {
      user: User;
    }
  | { user: null };

/**
 * Calls the /api/user/search endpoint with the given searchKey.
 * Returns the first user found, or null if none.
 */
export async function searchUserByKey(
  searchKey: string
): Promise<SearchUserByKeyResponse> {
  if (!searchKey) return { user: null };
  const res = await fetch(
    `/api/search/user?searchKey=${encodeURIComponent(searchKey)}`
  );
  if (!res.ok) return { user: null };
  return res.json();
}
