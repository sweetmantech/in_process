import CollectionItemSkeleton from "./CollectionItemSkeleton";

const MomentsSkeleton = () => (
  <div className="grid grow grid-cols-1 gap-6 px-4 md:grid-cols-4 md:px-10">
    {[...Array(20)].map((_, i) => (
      <CollectionItemSkeleton key={i} />
    ))}
  </div>
);

export default MomentsSkeleton;
