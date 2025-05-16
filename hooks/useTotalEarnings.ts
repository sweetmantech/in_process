import { useUserCollectionsProvider } from "@/providers/UserCollectionsProvider";
import { useEthPriceProvider } from "@/providers/EthPriceProvider";

const useTotalEarnings = () => {
  const { data } = useUserCollectionsProvider();
  const { ethPrice } = useEthPriceProvider();
  const ethEarnings = Number(
    Number(data?.totalEarnings?.eth || 0) * ethPrice,
  ).toFixed(2);
  const usdcEarnings = Number(data?.totalEarnings?.usdc).toFixed(2);
  const totalEarnings = parseFloat(ethEarnings) + parseFloat(usdcEarnings);

  return {
    totalEarnings,
  };
};

export default useTotalEarnings;
