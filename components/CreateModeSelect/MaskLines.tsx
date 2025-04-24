"use client";

import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";

const MaskLines = () => {
  const { maskId, svgRef, masks, createdContract } = useZoraCreateProvider();
  const pathname = usePathname();
  const isWritingPage = pathname === "/create/writing";

  if (!isWritingPage || createdContract) return <Fragment />;

  return (
    <div className="hidden md:block absolute size-full pointer-events-none">
      <div className="absolute inset-0 border-b border-b-grey-moss-200" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
                    to right,
                    transparent,
                    transparent 19px,
                    #999999 19px,
                    #999999 20px
                  )`,
          backgroundSize: "20px 100%",
          maskImage: `url(#${maskId})`,
          WebkitMaskImage: `url(#${maskId})`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
                    to bottom,
                    transparent,
                    transparent 19px,
                  #999999 19px,
                  #999999 20px
                  )`,
          backgroundSize: "100% 20px",
          maskImage: `url(#${maskId})`,
          WebkitMaskImage: `url(#${maskId})`,
        }}
      />
      <svg ref={svgRef} className="absolute inset-0 w-full h-full">
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="white" />
            {masks.map((mask, i) => (
              <React.Fragment key={i}>
                <rect
                  x={mask.x}
                  y={mask.y}
                  width={mask.width}
                  height={mask.height}
                  fill="black"
                />
              </React.Fragment>
            ))}
          </mask>
        </defs>
      </svg>
    </div>
  );
};

export default MaskLines;
