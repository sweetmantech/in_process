import { useRouter } from "next/navigation";
import { TimelineMoment } from "@/types/moment";
import { base } from "viem/chains";

export const useMomentNavigation = (moment: TimelineMoment) => {
  const { push } = useRouter();

  const handleMomentClick = () => {
    const { chain_id, address, token_id } = moment;
    const shortName = chain_id === base.id ? "base" : "bsep";
    push(`/collect/${shortName}:${address}/${token_id}`);
  };

  return { handleMomentClick };
};
