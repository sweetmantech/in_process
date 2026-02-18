import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { formatEther, formatUnits, parseEther, parseUnits } from "viem";
import { useMomentProvider } from "@/providers/MomentProvider";
import { setSale } from "@/lib/moment/setSale";
import { MomentType } from "@/types/moment";

const useSetSale = () => {
  const { moment, saleConfig: sale, fetchMomentData } = useMomentProvider();
  const { getAccessToken } = usePrivy();
  const [saleStart, setSaleStart] = useState<Date>(new Date());
  const [priceInput, setPriceInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const isErc20 = sale?.type === MomentType.Erc20Mint;
  const priceUnit = isErc20 ? "USDC" : "ETH";

  useEffect(() => {
    if (sale) {
      setSaleStart(
        BigInt(sale.saleStart) === BigInt(0)
          ? new Date()
          : new Date(parseInt(sale.saleStart.toString(), 10) * 1000)
      );
      setPriceInput(
        isErc20
          ? formatUnits(BigInt(sale.pricePerToken), 6)
          : formatEther(BigInt(sale.pricePerToken))
      );
    }
  }, [sale]);

  const handleSetSale = async () => {
    setIsLoading(true);
    try {
      const accessToken = await getAccessToken();
      const pricePerToken = isErc20
        ? parseUnits(priceInput, 6).toString()
        : parseEther(priceInput).toString();
      await setSale(accessToken as string, moment, saleStart.toISOString(), pricePerToken);
      fetchMomentData();
    } finally {
      setIsLoading(false);
    }
  };

  return { saleStart, setSaleStart, priceInput, setPriceInput, priceUnit, setSale: handleSetSale, isLoading };
};

export default useSetSale;
