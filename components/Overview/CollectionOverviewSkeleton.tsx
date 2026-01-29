import { Skeleton } from "../ui/skeleton";

const CollectionOverviewSkeleton = () => (
  <div className="w-full px-4 pt-8 md:px-10">
    {/* Breadcrumbs skeleton */}
    <div className="flex items-center gap-2">
      <Skeleton className="h-4 w-20" />
      <span className="text-grey-moss-300">/</span>
      <Skeleton className="h-4 w-32" />
    </div>
    {/* OverviewContent skeleton */}
    <div className="w-fit pt-4 flex flex-col items-center gap-2 md:flex-row">
      <Skeleton className="aspect-[1/1] w-24 rounded-md" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-40 md:h-10" />
        <Skeleton className="h-8 w-32 rounded-md" />
      </div>
    </div>
  </div>
);

export default CollectionOverviewSkeleton;
