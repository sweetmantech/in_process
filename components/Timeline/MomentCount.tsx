import { Skeleton } from "@/components/ui/skeleton";
import { useTotalMomentsCount } from "@/hooks/useTotalMomentsCount";

const MomentCount = () => {
  const { data: count } = useTotalMomentsCount();

  return (
    <div className="font-archivo-medium text-lg text-grey-moss-400 md:text-2xl">
      {count ? count : <Skeleton className="inline-block h-5 w-10 align-middle" />} moments have
      been shared
    </div>
  );
};

export default MomentCount;
