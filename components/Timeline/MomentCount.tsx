import { Skeleton } from "@/components/ui/skeleton";
import { useTotalMomentsCount } from "@/hooks/useTotalMomentsCount";

const MomentCount = () => {
  const { data: count, isLoading } = useTotalMomentsCount();
  if (isLoading) {
    return <Skeleton className="h-6 w-48 md:h-8 md:w-64" />;
  }

  return (
    <p className="font-archivo-medium text-lg text-grey-moss-400 md:text-2xl">
      {count} moments have been shared
    </p>
  );
};

export default MomentCount;
