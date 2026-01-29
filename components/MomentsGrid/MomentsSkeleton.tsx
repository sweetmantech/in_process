import MomentItemSkeleton from "./MomentItemSkeleton";

interface MomentsSkeletonProps {
  count?: number;
}

const MomentsSkeleton = ({ count = 20 }: MomentsSkeletonProps) => (
  <div className="grid w-full grow grid-cols-2 gap-3 px-4 md:grid-cols-5 md:px-10">
    {[...Array(count)].map((_, i) => (
      <MomentItemSkeleton key={i} />
    ))}
  </div>
);

export default MomentsSkeleton;
