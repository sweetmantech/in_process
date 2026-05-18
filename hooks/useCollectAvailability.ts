import { useMomentProvider } from "@/providers/MomentProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { Protocol } from "@/types/moment";

const useCollectAvailability = () => {
  const { isSoldOut, isSaleActive, protocol } = useMomentProvider();
  const { isLoading: isSmartWalletLoading } = useSmartWalletProvider();

  const isInProcess = protocol === Protocol.InProcess;
  const isWalletLoading = isSmartWalletLoading;
  const isCollectDisabled = !isSaleActive || isSoldOut || !isInProcess || isWalletLoading;
  const collectCtaLabel = isSoldOut || !isInProcess ? "sold out" : "collect";

  return { isCollectDisabled, collectCtaLabel };
};

export default useCollectAvailability;
