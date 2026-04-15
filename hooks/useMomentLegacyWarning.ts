import { useMomentProvider } from "@/providers/MomentProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";

const useMomentLegacyWarning = () => {
  const { smartWallet } = useSmartWalletProvider();
  const { momentAdmins, isOwner } = useMomentProvider();
  const hasMomentAdmins = Array.isArray(momentAdmins);

  const hasWarning =
    smartWallet && hasMomentAdmins && !momentAdmins.includes(smartWallet.toLowerCase()) && isOwner;

  return hasWarning;
};

export default useMomentLegacyWarning;
