import { Address } from "viem";
import { SaleConfig } from "./useTokenInfo";
import getCollectRequest from "@/lib/getCollectRequest";
import useSignedAddress from "./useSignedAddress";
import { TokenInfo } from "@/types/token";
import useSignTransaction from "./useSignTransaction";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID } from "@/lib/consts";
import { useUserProvider } from "@/providers/UserProvider";

const useNativeMint = () => {
  const { balances } = useUserProvider();
  const signedAddress = useSignedAddress();
  const { signTransaction } = useSignTransaction();

  const mintWithNativeToken = async (
    sale: SaleConfig,
    token: TokenInfo,
    comment: string,
    mintCount: number = 1
  ) => {
    const publicClient = getPublicClient(CHAIN_ID);
    const price = sale.pricePerToken;
    const ethBalance = balances.ethBalance;
    if (ethBalance > price) {
      const request = getCollectRequest(token, sale, signedAddress as Address, comment, mintCount);
      if (!request) throw new Error();
      const hash = await signTransaction(request);
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      return receipt;
    }

    return false;
  };

  return {
    mintWithNativeToken,
  };
};

export default useNativeMint;
