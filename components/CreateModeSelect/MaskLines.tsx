"use client";

import useIsMobile from "@/hooks/useIsMobile";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useTypeParam from "@/hooks/useTypeParam";

const MaskLines = () => {
  const { maskId, svgRef, masks } = useMetadataFormProvider();
  const type = useTypeParam();
  const isMobile = useIsMobile();

  if (type !== "writing" || isMobile) return null;

  const maskStyle = {
    maskImage: `url(#${maskId})`,
    WebkitMaskImage: `url(#${maskId})`,
  };

  return (
    <div className="pointer-events-none absolute size-full">
      <div
        className="absolute inset-0"
        style={{
          ...maskStyle,
          backgroundImage: `repeating-linear-gradient(to right, transparent, transparent 14px, #999999 14px, #999999 15px)`,
          backgroundSize: "15px 100%",
        }}
      />
      <div
        className="absolute inset-0 border-b border-t border-b-grey-moss-200 border-t-grey-moss-200"
        style={{
          ...maskStyle,
          backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 14px, #999999 14px, #999999 15px)`,
          backgroundSize: "100% 15px",
        }}
      />
      <svg ref={svgRef} className="absolute inset-0 hidden h-full w-full md:block">
        <defs>
          <mask id={maskId}>
            <rect width="100%" height="100%" fill="white" />
            {masks.map((mask, i) => (
              <rect
                key={i}
                x={mask.x}
                y={mask.y}
                width={mask.width}
                height={mask.height}
                fill="black"
              />
            ))}
          </mask>
        </defs>
      </svg>
    </div>
  );
};

export default MaskLines;
