"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { usePathname } from "next/navigation";
import React from "react";

const MaskLines = () => {
  const { maskId, svgRef, masks } = useMetadataFormProvider();
  const { createdTokenId } = useMomentCreateProvider();
  const pathname = usePathname();
  const isWritingPage = pathname === "/create/writing";
  const isLinkPage = pathname === "/create/link";
  const isEmbedPage = pathname === "/create/embed";
  const isMobile = useIsMobile();

  return (
    <div
      className={`pointer-events-none absolute size-full ${(isWritingPage || ((isLinkPage || isEmbedPage) && isMobile)) && !createdTokenId ? "opacity-1" : "opacity-0"}`}
    >
      <div className="absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
                    to right,
                    transparent,
                    transparent 14px,
                    #999999 14px,
                    #999999 15px
                  )`,
          backgroundSize: "15px 100%",
          maskImage: `url(#${maskId})`,
          WebkitMaskImage: `url(#${maskId})`,
        }}
      />
      <div
        className="absolute inset-0 border-b border-t border-b-grey-moss-200 border-t-grey-moss-200"
        style={{
          backgroundImage: `repeating-linear-gradient(
                    to bottom,
                    transparent,
                    transparent 14px,
                  #999999 14px,
                  #999999 15px
                  )`,
          backgroundSize: "100% 15px",
          maskImage: `url(#${maskId})`,
          WebkitMaskImage: `url(#${maskId})`,
        }}
      />
      <svg ref={svgRef} className="absolute inset-0 hidden h-full w-full md:block">
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="white" />
            {masks.map((mask, i) => (
              <React.Fragment key={i}>
                <rect x={mask.x} y={mask.y} width={mask.width} height={mask.height} fill="black" />
              </React.Fragment>
            ))}
          </mask>
        </defs>
      </svg>
    </div>
  );
};

export default MaskLines;
