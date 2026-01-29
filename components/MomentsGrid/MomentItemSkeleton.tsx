import { Skeleton } from "@/components/ui/skeleton";

const MomentItemSkeleton = () => (
  <div className="col-span-1 w-full overflow-hidden rounded-xl bg-white shadow-sm">
    <Skeleton className="aspect-square w-full rounded-none bg-grey-moss-50" />
    <div className="p-2">
      <Skeleton className="h-4 w-3/4 bg-grey-moss-100" />
      <Skeleton className="mt-1 h-3 w-1/2 bg-grey-moss-100" />
    </div>
  </div>
);

export default MomentItemSkeleton;
