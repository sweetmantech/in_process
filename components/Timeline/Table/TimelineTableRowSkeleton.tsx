import { Skeleton } from "@/components/ui/skeleton";

const TimelineTableRowSkeleton = () => (
  <div className="flex w-full items-start justify-between p-4">
    <div className="space-y-1">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-3 w-28" />
    </div>
    <Skeleton className="h-4 w-20" />
  </div>
);

export default TimelineTableRowSkeleton;
