import { useState } from "react";

const useAirdrop = () => {
  const [walletAddresses, setWalletAddresses] = useState<string[]>([""]);

  const onChangeAddress = (value: string, i: number) => {
    const temp = [...walletAddresses];
    temp[i] = value;
    setWalletAddresses(temp);
  };

  return {
    walletAddresses,
    onChangeAddress,
  };
};

export default useAirdrop;
