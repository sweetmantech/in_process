import { Skeleton } from "../ui/skeleton";
import { useCollectionProvider } from "@/providers/CollectionProvider";

const CollectionInfo = () => {
  const { data, isLoading } = useCollectionProvider();
  const collectionName = data?.name || "";

  return (
    <div className="relative">
      <p className="text-xl md:text-5xl font-archivo-medium tracking-[-1px]">
        {isLoading ? <Skeleton className="w-[150px] h-12" /> : collectionName}
      </p>
    </div>
  );
};

export default CollectionInfo;
