import { useEffect, useState } from "react";

const useEthPrice = () => {
  const [ethPrice, setEthPrice] = useState<number>(0);

  useEffect(() => {
    const init = async () => {
      const response = await fetch("/api/get_eth_price");
      const data = await response.json();
      setEthPrice(parseFloat(data));
    };
    init();
  }, []);

  return {
    ethPrice,
  };
};

export default useEthPrice;
