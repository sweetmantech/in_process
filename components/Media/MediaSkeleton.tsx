import { Skeleton } from "../ui/skeleton";

const MediaSkeleton = () => (
  <div className="w-full font-archivo">
    <div className="mt-4 max-w-md rounded-lg bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-24 w-full rounded-md" />
        </div>
        <Skeleton className="min-h-[400px] w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  </div>
);

export default MediaSkeleton;
