import { fetchCollection } from "@/lib/collections/fetchCollection";
import { FetchCollectionParams } from "@/types/collections";
import { useQuery } from "@tanstack/react-query";

const useCollection = ({ collectionAddress, chainId }: FetchCollectionParams) => {
  return useQuery({
    queryKey: ["collection", collectionAddress, chainId],
    queryFn: () =>
      fetchCollection({
        collectionAddress,
        chainId,
      }),
    enabled: Boolean(collectionAddress && chainId),
  });
};

export default useCollection;
