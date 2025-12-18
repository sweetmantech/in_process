import { useRouter } from "next/navigation";
import { TimelineMoment } from "@/types/moment";
import { base } from "viem/chains";
import { useMetadata } from "./useMetadata";

export const useMomentClick = (moment: TimelineMoment) => {
  const { push } = useRouter();
  const { data, isLoading } = useMetadata(moment.uri);

  const handleMomentClick = () => {
    const { chain_id, address, token_id } = moment;
    if (isLoading || !data) return;
    if (data?.external_url) {
      window.open(data.external_url, "_blank");
      return;
    }
    const shortName = chain_id === base.id ? "base" : "bsep";
    push(`/collect/${shortName}:${address}/${token_id}`);
  };

  return { handleMomentClick, isLoading, data };
};
