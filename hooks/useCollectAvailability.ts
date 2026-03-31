import { useMomentProvider } from "@/providers/MomentProvider";
import { Protocol } from "@/types/moment";

const useCollectAvailability = () => {
  const { isSoldOut, isSaleActive, protocol } = useMomentProvider();

  const isSoundXyz = protocol === Protocol.SoundXyz;
  const isCollectDisabled = !isSaleActive || isSoldOut || isSoundXyz;
  const collectCtaLabel = isSoldOut || isSoundXyz ? "sold out" : "collect";

  return { isCollectDisabled, collectCtaLabel };
};

export default useCollectAvailability;
