import useConnectedWallet from "./useConnectedWallet";
import { Address, createWalletClient, custom, zeroAddress } from "viem";
import { CHAIN, CHAIN_ID } from "@/lib/consts";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useSwitchChain, useWriteContract } from "wagmi";

const useSignTransaction = () => {
  const { wallet } = useConnectedWallet();
  const { context } = useFrameProvider();
  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();

  const signTransaction = async (
    address: Address,
    account: Address,
    abi: any,
    functionName: string,
    args: any,
    value = BigInt(0),
  ) => {
    if (context) {
      await switchChainAsync({ chainId: CHAIN_ID });
      const hash = await writeContractAsync({
        address,
        account,
        abi,
        functionName,
        args,
        value,
      });
      return hash;
    }

    if (!wallet) throw new Error("No wallet connected for transaction signing");
    await wallet.switchChain(CHAIN_ID);
    const provider = await wallet.getEthereumProvider();
    const client = createWalletClient({
      account,
      chain: getViemNetwork(CHAIN_ID),
      transport: custom(provider),
    });
    const hash = await client.writeContract({
      address,
      abi,
      functionName,
      args,
      account,
      chain: CHAIN,
    });
    return hash;
  };

  return { signTransaction };
};

export default useSignTransaction;
