import useConnectedWallet from "./useConnectedWallet";
import { Address, createWalletClient, custom } from "viem";
import { CHAIN_ID } from "@/lib/consts";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { useFrameProvider } from "@/providers/FrameProvider";
import { useSwitchChain, useWriteContract } from "wagmi";

type Parameters = {
  address: Address;
  account: Address;
  abi: any;
  functionName: string;
  args: any;
  value: any;
};
const useSignTransaction = () => {
  const { wallet } = useConnectedWallet();
  const { context } = useFrameProvider();
  const { writeContractAsync } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();

  const signTransaction = async (parameters: Parameters) => {
    const { account } = parameters;
    if (context) {
      await switchChainAsync({ chainId: CHAIN_ID });
      const hash = await writeContractAsync(parameters);
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
    const hash = await client.writeContract(parameters);
    return hash;
  };

  return { signTransaction };
};

export default useSignTransaction;
