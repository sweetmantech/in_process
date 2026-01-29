import { Skeleton } from "../ui/skeleton";

const SaleSkeleton = () => (
  <div className="w-full font-archivo">
    <div className="mt-4 flex w-full max-w-md flex-col gap-2 rounded-2xl bg-white p-4 pt-4">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-10 w-full rounded-md" />
      <Skeleton className="h-10 w-24 rounded-md" />
    </div>
  </div>
);

export default SaleSkeleton;
