import { Skeleton } from "../ui/skeleton";
import useTotalEarnings from "@/hooks/useTotalEarnings";

const TotalEarnings = ({ className }: { className: string }) => {
  const { isLoading, data } = useTotalEarnings();
  const usdcAmount = Number(data || 0).toFixed(2);

  return (
    <div className={`font-spectral ${className}`}>
      {isLoading ? (
        <Skeleton className="mt-1 h-4 w-10 bg-grey-moss-300 md:w-8" />
      ) : (
        `$${usdcAmount}`
      )}
    </div>
  );
};

export default TotalEarnings;
