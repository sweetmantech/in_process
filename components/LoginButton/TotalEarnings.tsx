import { useUserCollectionsProvider } from "@/providers/UserCollectionsProvider";
import { Skeleton } from "../ui/skeleton";

const TotalEarnings = ({ className }: { className: string }) => {
  const { data, isLoading } = useUserCollectionsProvider();
  return (
    <div
      className={`text-white md:text-base font-spectral text-xl ${className}`}
    >
      {isLoading ? (
        <Skeleton className="bg-grey-moss-300 w-10 md:w-8 h-4 mt-1" />
      ) : (
        `${data?.totalEarnings} ETH`
      )}
    </div>
  );
};

export default TotalEarnings;
