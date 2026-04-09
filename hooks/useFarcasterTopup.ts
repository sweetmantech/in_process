import { erc20Abi, parseEther, parseUnits, Address } from "viem";
import { useSendTransaction, useWriteContract, usePublicClient } from "wagmi";
import { CHAIN_ID, USDC_ADDRESS } from "@/lib/consts";
import { Currency } from "@/types/balances";
import { toast } from "sonner";

// Transfers ETH or USDC from the Farcaster-connected wallet to the smart wallet.
// Used instead of the topup page modal when running inside a Farcaster mini-app.
const useFarcasterTopup = () => {
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const topup = async (currency: Currency, amount: number, smartWallet: Address): Promise<void> => {
    toast.info(`Requesting ${currency.toUpperCase()} transfer to your smart wallet...`);

    let hash: `0x${string}`;

    if (currency === "usdc") {
      hash = await writeContractAsync({
        address: USDC_ADDRESS[CHAIN_ID],
        abi: erc20Abi,
        functionName: "transfer",
        args: [smartWallet, parseUnits(amount.toString(), 6)],
        chainId: CHAIN_ID,
      });
    } else {
      hash = await sendTransactionAsync({
        to: smartWallet,
        value: parseEther(amount.toString()),
        chainId: CHAIN_ID,
      });
    }

    toast.info("Waiting for transfer confirmation...");
    const receipt = await publicClient!.waitForTransactionReceipt({ hash });

    if (receipt.status !== "success") {
      throw new Error("Topup transaction failed");
    }

    toast.success(`${currency.toUpperCase()} transferred to smart wallet`);
  };

  return { topup };
};

export default useFarcasterTopup;
