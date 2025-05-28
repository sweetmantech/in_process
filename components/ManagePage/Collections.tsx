import { Collection } from "@/types/token";
import CollectionItem from "./CollectionItem";
import { useUserCollectionsProvider } from "@/providers/UserCollectionsProvider";

const Collections = () => {
  const { collections } = useUserCollectionsProvider();

  if (collections)
    return (
      <div className="grow grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-10">
        {collections.map((c: Collection, i) => (
          <CollectionItem c={c} key={i} />
        ))}
      </div>
    );
};

export default Collections;
