import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import React from "react";

const MaskLines = () => {
  const { maskId, svgRef, masks } = useZoraCreateProvider();

  return (
    <>
      <div className="absolute inset-0 pointer-events-none border-b border-b-[#605F5C]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
                    to right,
                    transparent,
                    transparent 24px,
                    #605F5C 24px,
                    #605F5C 25px
                  )`,
          backgroundSize: "25px 100%",
          maskImage: `url(#${maskId})`,
          WebkitMaskImage: `url(#${maskId})`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
                    to bottom,
                    transparent,
                    transparent 24px,
                  #605F5C 24px,
                  #605F5C 25px
                  )`,
          backgroundSize: "100% 25px",
          maskImage: `url(#${maskId})`,
          WebkitMaskImage: `url(#${maskId})`,
        }}
      />
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
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
    </>
  );
};

export default MaskLines;
