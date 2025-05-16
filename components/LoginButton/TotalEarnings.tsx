import { useUserCollectionsProvider } from "@/providers/UserCollectionsProvider";
import { Skeleton } from "../ui/skeleton";
import useTotalEarnings from "@/hooks/useTotalEarnings";

const TotalEarnings = ({ className }: { className: string }) => {
  const { isLoading } = useUserCollectionsProvider();
  const { totalEarnings } = useTotalEarnings();

  return (
    <div
      className={`text-white md:text-base font-spectral text-xl ${className}`}
    >
      {isLoading ? (
        <Skeleton className="bg-grey-moss-300 w-10 md:w-8 h-4 mt-1" />
      ) : (
        `$${totalEarnings}`
      )}
    </div>
  );
};

export default TotalEarnings;
