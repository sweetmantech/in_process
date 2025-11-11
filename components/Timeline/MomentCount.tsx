import { Skeleton } from "@/components/ui/skeleton";
import { useTotalMomentsCount } from "@/hooks/useTotalMomentsCount";

const MomentCount = () => {
  const { data: count, isLoading } = useTotalMomentsCount();
  if (isLoading) {
    return <Skeleton className="h-6 md:h-8 w-48 md:w-64" />;
  }

  return (
    <p className="font-archivo-medium text-lg md:text-2xl text-grey-moss-400">
      {count} moments have been shared
    </p>
  );
};

export default MomentCount;
