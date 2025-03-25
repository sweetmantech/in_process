import { useRouter } from "next/navigation";
import useBalance from "./useBalance";
import { toast } from "sonner";
import { Address } from "viem";

interface SmartWallet {
  smartWalletAddress: Address;
}

async function createSmartWallet(): Promise<SmartWallet> {
  const response = await fetch(`/api/smartwallet/create`);
  const data = await response.json();
  return data;
}

const useCreateRedirect = () => {
  const { balance } = useBalance();
  const { push } = useRouter();

  const handleCreate = async () => {
    if (balance === 0) {
      const data = await createSmartWallet();
      toast.success(`Smart Wallet Created: ${data.smartWalletAddress}`);
    }

    push("/create");
  };

  return {
    handleCreate,
  };
};

export default useCreateRedirect;
