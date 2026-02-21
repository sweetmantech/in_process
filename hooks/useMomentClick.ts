import { useRouter } from "next/navigation";
import { TimelineMoment } from "@/types/moment";
import { base } from "viem/chains";
import { useMetadata } from "./useMetadata";
import { validateUrl } from "@/lib/url/validateUrl";

export const useMomentClick = (moment: TimelineMoment | undefined) => {
  const { push } = useRouter();
  const { data, isLoading } = useMetadata(moment?.uri || "");

  const handleMomentClick = () => {
    if (!moment) return;
    const { chain_id, address, token_id } = moment;
    if (isLoading || !data) return;
    if (data?.external_url) {
      // Validate URL before opening to prevent phishing
      if (validateUrl(data.external_url)) {
        window.open(data.external_url, "_blank", "noopener,noreferrer");
      }
      return;
    }
    const shortName = chain_id === base.id ? "base" : "bsep";
    push(`/collect/${shortName}:${address}/${token_id}`);
  };

  return { handleMomentClick, isLoading, data };
};
