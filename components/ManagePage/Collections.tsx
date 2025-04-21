import { useMyCollections } from "@/hooks/useManageCollections";
import Loading from "../Loading";
import { Collection } from "@/types/token";
import CollectionItem from "./CollectionItem";

const Collections = () => {
  const { data, isLoading } = useMyCollections();

  if (isLoading)
    return (
      <div className="grow flex items-center justify-center">
        <Loading className="w-[180px] aspect-[1/1] md:w-[300px]" />
      </div>
    );
  if (data)
    return (
      <div className="grow grid grid-cols-4 gap-6 px-10">
        {data.map((c: Collection, i) => (
          <CollectionItem c={c} key={i} />
        ))}
      </div>
    );
};

export default Collections;
