import { useEffect, useState } from "react";
import { useTokenProvider } from "@/providers/TokenProvider";

const useSaleConfig = () => {
  const { saleConfig: sale } = useTokenProvider();
  const [saleStart, setSaleStart] = useState<Date>(new Date());

  useEffect(() => {
    if (sale) {
      setSaleStart(
        sale.saleStart === BigInt(0)
          ? new Date()
          : new Date(parseInt(sale.saleStart.toString(), 10) * 1000),
      );
    }
  }, [sale]);

  return {
    saleStart,
    setSaleStart,
  };
};

export default useSaleConfig;
