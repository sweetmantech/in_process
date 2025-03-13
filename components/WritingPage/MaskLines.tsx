import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

const MaskLines = () => {
  const { maskId, svgRef, masks } = useZoraCreateProvider();

  return (
    <>
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
    </>
  );
};

export default MaskLines;
