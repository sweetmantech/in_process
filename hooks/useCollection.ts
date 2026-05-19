import { callGetCollectionApi } from "@/lib/collection/callGetCollectionApi";
import { FetchCollectionParams } from "@/types/collections";
import { useQuery } from "@tanstack/react-query";

const useCollection = ({ collectionAddress, chainId }: FetchCollectionParams) => {
  return useQuery({
    queryKey: ["collection", collectionAddress, chainId],
    queryFn: () =>
      callGetCollectionApi({
        collectionAddress,
        chainId,
      }),
    enabled: Boolean(collectionAddress && chainId),
    staleTime: 1000 * 60 * 5,
  });
};

export default useCollection;
