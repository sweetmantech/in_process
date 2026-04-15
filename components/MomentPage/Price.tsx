import getPrice from "@/lib/getPrice";
import getPriceUnit from "@/lib/getPriceUnit";
import { useMomentProvider } from "@/providers/MomentProvider";
import { Skeleton } from "../ui/skeleton";

const Price = () => {
  const { isLoading, saleConfig, isSetSale } = useMomentProvider();
  if (!isSetSale) return null;

  return (
    <div className="mt-2 space-y-1 md:mt-4 md:space-y-2">
      <p className="font-archivo text-sm md:text-lg">moment collection price</p>
      {isLoading ? (
        <Skeleton className="h-6 w-full" />
      ) : (
        <p className="w-2/3 rounded-md border border-black bg-grey-moss-50 text-center font-archivo text-sm md:w-full md:text-base">
          {BigInt(saleConfig?.pricePerToken) === BigInt(0)
            ? "free"
            : `${getPrice(saleConfig?.pricePerToken || BigInt(0), saleConfig?.type)} ${getPriceUnit(saleConfig?.type || "")}`}
        </p>
      )}
    </div>
  );
};

export default Price;
