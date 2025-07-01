import { useQuery } from "@tanstack/react-query";
import {
  searchMatrixByKey,
  SearchMatrixByKeyResponse,
} from "@/lib/searchMatrixByKey";

/**
 * React Query hook to search matrix data by key.
 * @param searchKey - The search string.
 * @returns Query result: { data, isLoading, error }
 */
export function useMatrixSearch(searchKey: string) {
  return useQuery<SearchMatrixByKeyResponse>({
    queryKey: ["matrixSearch", searchKey],
    queryFn: () => searchMatrixByKey(searchKey),
    enabled: !!searchKey, // Only run if searchKey is non-empty
    staleTime: 1000 * 30, // 30 seconds (adjust as needed)
  });
}
