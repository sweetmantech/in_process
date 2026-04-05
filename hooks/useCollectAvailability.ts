import { useMomentProvider } from "@/providers/MomentProvider";
import { Protocol } from "@/types/moment";

const useCollectAvailability = () => {
  const { isSoldOut, isSaleActive, protocol } = useMomentProvider();

  const isInProcess = protocol === Protocol.InProcess;
  const isCollectDisabled = !isSaleActive || isSoldOut || !isInProcess;
  const collectCtaLabel = isSoldOut || !isInProcess ? "sold out" : "collect";

  return { isCollectDisabled, collectCtaLabel };
};

export default useCollectAvailability;
