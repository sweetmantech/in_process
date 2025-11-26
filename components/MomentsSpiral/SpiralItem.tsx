import React from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { formatFeedText, generateSpacer } from "@/lib/spiralUtils";
import { useRouter } from "next/navigation";
import { useMetadata } from "@/hooks/useMetadata";
import truncateAddress from "@/lib/truncateAddress";
import { Moment } from "@/types/timeline";
import { useMomentsSpiralProvider } from "@/providers/MomentsSpiralProvider";

interface MomentProps {
  moment: Moment;
  index: number;
}
const SpiralItem = ({ moment, index }: MomentProps) => {
  const isMobile = useIsMobile();
  const { push } = useRouter();
  const { data } = useMetadata(moment.uri);
  const { onMomentMouseMove, onMomentMouseLeave, animationConfig } = useMomentsSpiralProvider();

  return (
    <React.Fragment>
      {index > 0 && generateSpacer(animationConfig.spacerWidth)}
      <tspan
        onMouseMove={(e) => onMomentMouseMove(e, moment)}
        onMouseLeave={onMomentMouseLeave}
        onClick={() => push(`/${moment.admins[0].address}`)}
        dominantBaseline="middle"
      >
        <tspan fill="#1B1504" fontSize={isMobile ? 3 : 6} textAnchor="middle">
          ⬤
        </tspan>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        {formatFeedText(
          moment.admins[0].username || truncateAddress(moment.admins[0].address),
          (data?.name || "").slice(0, 111),
          Date.parse(moment.created_at),
          isMobile ? 14 : 20
        )}
      </tspan>
    </React.Fragment>
  );
};

export default SpiralItem;
