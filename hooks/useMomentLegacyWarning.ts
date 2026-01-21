import { useMomentProvider } from "@/providers/MomentProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";

const useMomentLegacyWarning = () => {
  const { smartWallet } = useSmartWalletProvider();
  const { momentAdmins, isOwner } = useMomentProvider();

  const hasWarning =
    smartWallet && momentAdmins && !momentAdmins.includes(smartWallet.toLowerCase()) && isOwner;

  return hasWarning;
};

export default useMomentLegacyWarning;
