import { CollectionsResponse, PageParam } from "@/types/fetch-collections";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchCollections(
  param?: PageParam,
): Promise<CollectionsResponse> {
  const response = await fetch("/api/collections", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(param || {}),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch all collections");
  }
  const data = await response.json();
  return data;
}

export function useCollections() {
  return useInfiniteQuery({
    queryKey: ["collectons"],
    queryFn: ({ pageParam }) => fetchCollections(pageParam),
    getNextPageParam: (lastPage: CollectionsResponse) => {
      if (
        Boolean(
          !lastPage.nextOffsets?.factory && !lastPage.nextOffsets.smartWallet,
        )
      )
        return undefined;
      return {
        offsets: lastPage.nextOffsets,
      };
    },
    initialPageParam: undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: (failureCount) => {
      return failureCount < 2;
    },
  });
}
