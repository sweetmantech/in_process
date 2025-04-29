import { useUserCollectionsProvider } from "@/providers/UserCollectionsProvider";
import { Skeleton } from "../ui/skeleton";
import { useEthPriceProvider } from "@/providers/EthPriceProvider";

const TotalEarnings = ({ className }: { className: string }) => {
  const { data, isLoading } = useUserCollectionsProvider();
  const { ethPrice } = useEthPriceProvider();
  return (
    <div
      className={`text-white md:text-base font-spectral text-xl ${className}`}
    >
      {isLoading ? (
        <Skeleton className="bg-grey-moss-300 w-10 md:w-8 h-4 mt-1" />
      ) : (
        `$${Number(Number(data?.totalEarnings || 0) * ethPrice).toFixed(6)}`
      )}
    </div>
  );
};

export default TotalEarnings;
