import { useQuery } from "@tanstack/react-query";
import {
  searchUserByKey,
  SearchUserByKeyResponse,
} from "@/lib/searchUserByKey";

/**
 * React Query hook to search matrix data by key.
 * @param searchKey - The search string.
 * @returns Query result: { data, isLoading, error }
 */
export function useUserSearch(searchKey: string) {
  return useQuery<SearchUserByKeyResponse>({
    queryKey: ["userSearch", searchKey],
    queryFn: () => searchUserByKey(searchKey),
    enabled: !!searchKey, // Only run if searchKey is non-empty
    staleTime: 1000 * 30, // 30 seconds (adjust as needed)
  });
}
