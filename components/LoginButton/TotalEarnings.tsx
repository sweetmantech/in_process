import { useUserCollectionsProvider } from "@/providers/UserCollectionsProvider";
import { Skeleton } from "../ui/skeleton";
import useTotalEarnings from "@/hooks/useTotalEarnings";

const TotalEarnings = ({ className }: { className: string }) => {
  const { totalAmount } = useTotalEarnings();
  const { isLoading } = useUserCollectionsProvider();

  return (
    <div
      className={`text-white md:text-base font-spectral text-xl ${className}`}
    >
      {isLoading ? (
        <Skeleton className="bg-grey-moss-300 w-10 md:w-8 h-4 mt-1" />
      ) : (
        `$${totalAmount}`
      )}
    </div>
  );
};

export default TotalEarnings;
