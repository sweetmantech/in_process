import { useSearchParams } from "next/navigation";

const useCollectionParam = () => {
  const searchParams = useSearchParams();
  const collection = searchParams.get("collectionAddress") as string;
  return collection;
};

export default useCollectionParam;
