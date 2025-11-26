import React from "react";
import { useMetadata } from "@/hooks/useMetadata";
import Loading from "../Loading";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import { InProcessMoment } from "@/types/moment";

interface MomentPopoverProps {
  moment: InProcessMoment;
  position: { x: number; y: number };
  isVisible: boolean;
}

export const MomentPopover: React.FC<MomentPopoverProps> = ({ moment, position, isVisible }) => {
  const { isLoading, data } = useMetadata(moment.uri);

  return (
    <div
      className="absolute border-[1px] border-grey-moss-900 z-50 bg-white transform -translate-y-full -translate-x-full pointer-events-none"
      style={{
        left: `${position.x - 150}px`,
        top: `${position.y - 50}px`,
        visibility: isVisible ? "visible" : "hidden",
      }}
    >
      <div className="w-[200px] aspect-[1/1] relative bg-grey-moss-100">
        {isLoading ? (
          <Loading className="size-full" />
        ) : (
          <Image
            src={getFetchableUrl(data?.image) || ""}
            alt="not found image"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        )}
      </div>
    </div>
  );
};
