import { Skeleton } from "@/components/ui/skeleton";

const SliderFeedSkeleton = () => (
  <div className="relative h-[200px] w-full overflow-hidden rounded-md md:h-auto">
    <Skeleton className="size-full min-h-[200px]" />
  </div>
);

export default SliderFeedSkeleton;
