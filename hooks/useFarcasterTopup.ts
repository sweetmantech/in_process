import { erc20Abi, Address } from "viem";
import {
  useSendTransaction,
  useWriteContract,
  usePublicClient,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { CHAIN_ID, USDC_ADDRESS } from "@/lib/consts";
import { Currency } from "@/types/balances";
import { toast } from "sonner";

// Transfers ETH or USDC from the Farcaster-connected wallet to the smart wallet.
// Used instead of the topup page modal when running inside a Farcaster mini-app.
const useFarcasterTopup = () => {
  const { mutateAsync: sendTransactionAsync } = useSendTransaction();
  const { mutateAsync: writeContractAsync } = useWriteContract();
  const { mutateAsync: switchChainAsync } = useSwitchChain();
  const publicClient = usePublicClient({ chainId: CHAIN_ID });
  const chainId = useChainId();

  const topup = async (currency: Currency, amount: bigint, smartWallet: Address): Promise<void> => {
    if (!publicClient) throw new Error("No public client available to confirm transaction");

    if (chainId !== CHAIN_ID) {
      toast.info("Switching to the correct network...");
      await switchChainAsync({ chainId: CHAIN_ID });
    }

    toast.info(`Requesting ${currency.toUpperCase()} transfer to your smart wallet...`);

    let hash: `0x${string}`;

    if (currency === "usdc") {
      hash = await writeContractAsync({
        address: USDC_ADDRESS[CHAIN_ID],
        abi: erc20Abi,
        functionName: "transfer",
        args: [smartWallet, amount], // already in 6-decimal base units
        chainId: CHAIN_ID,
      });
    } else {
      hash = await sendTransactionAsync({
        to: smartWallet,
        value: amount, // already in wei
        chainId: CHAIN_ID,
      });
    }

    toast.info("Waiting for transfer confirmation...");
    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (receipt.status !== "success") {
      throw new Error("Topup transaction failed");
    }

    toast.success(`${currency.toUpperCase()} transferred to smart wallet`);
  };

  return { topup };
};

export default useFarcasterTopup;
