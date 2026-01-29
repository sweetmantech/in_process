import SliderFeedSkeleton from "./SliderFeedSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const ArtSliderSkeleton = () => (
  <div className="relative flex h-full flex-col gap-2.5 py-5">
    <Skeleton className="absolute left-1/2 top-4 z-10 h-6 w-12 -translate-x-1/2 rounded-md" />
    {Array.from({ length: 5 }).map((_, i) => (
      <SliderFeedSkeleton key={i} />
    ))}
    <Skeleton className="absolute bottom-4 left-1/2 z-10 h-6 w-12 -translate-x-1/2 rounded-md" />
  </div>
);

export default ArtSliderSkeleton;
