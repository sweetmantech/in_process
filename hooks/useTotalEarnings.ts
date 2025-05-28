import { useUserCollectionsProvider } from "@/providers/UserCollectionsProvider";
import { useEthPriceProvider } from "@/providers/EthPriceProvider";

const useTotalEarnings = () => {
  const { totalEarnings } = useUserCollectionsProvider();
  const { ethPrice } = useEthPriceProvider();
  const ethEarnings = Number(
    Number(totalEarnings?.eth || 0) * ethPrice,
  ).toFixed(2);
  const usdcEarnings = Number(totalEarnings?.usdc).toFixed(2);
  const totalAmount = parseFloat(ethEarnings) + parseFloat(usdcEarnings);

  return {
    totalAmount,
  };
};

export default useTotalEarnings;
