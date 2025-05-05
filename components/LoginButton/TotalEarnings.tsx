import { useUserCollectionsProvider } from "@/providers/UserCollectionsProvider";
import { Skeleton } from "../ui/skeleton";
import { useEthPriceProvider } from "@/providers/EthPriceProvider";

const TotalEarnings = ({ className }: { className: string }) => {
  const { data, isLoading } = useUserCollectionsProvider();
  const { ethPrice } = useEthPriceProvider();
  const ethEarnings = Number(
    Number(data?.totalEarnings?.eth || 0) * ethPrice,
  ).toFixed(2);
  const usdcEarnings = Number(data?.totalEarnings?.usdc).toFixed(2);
  const totalEarnings = parseFloat(ethEarnings) + parseFloat(usdcEarnings);
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
