import { Skeleton } from "../ui/skeleton";
import useTotalEarnings from "@/hooks/useTotalEarnings";

const TotalEarnings = ({ className }: { className: string }) => {
  const { isLoading, data } = useTotalEarnings();
  const usdcAmount = Number(data || 0).toFixed(2);

  return (
    <div className={`font-spectral ${className}`}>
      {isLoading ? (
        <Skeleton className="bg-grey-moss-300 w-10 md:w-8 h-4 mt-1" />
      ) : (
        `$${usdcAmount}`
      )}
    </div>
  );
};

export default TotalEarnings;
