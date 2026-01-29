import { Skeleton } from "@/components/ui/skeleton";

const MomentItemSkeleton = () => (
  <div className="col-span-1 w-full overflow-hidden rounded-lg">
    <Skeleton className="aspect-video w-full rounded-none" />
    <div className="px-4 py-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="mt-1 h-4 w-1/2" />
    </div>
  </div>
);

export default MomentItemSkeleton;
