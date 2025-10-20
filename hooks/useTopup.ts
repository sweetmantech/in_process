import { USDC_ADDRESS } from "@/lib/consts";
import { useMemo, useState } from "react";

const useTopup = () => {
  const [depositAmount, setDepositAmount] = useState<string>("0.111");
  const [isDepositing, setIsDepositing] = useState<boolean>(false);

  const callData = useMemo(() => {
    return {
      totalPrice: depositAmount,
      _usdc: USDC_ADDRESS,
    };
  }, [depositAmount]);

  return {
    isDepositing,
    depositAmount,
    callData,
    setDepositAmount,
    setIsDepositing,
  };
};

export default useTopup;
