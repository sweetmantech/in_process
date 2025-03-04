"use client";

import MetadataCreation from "@/components/MetadataCreation";
import Title from "./Title";
import CreateButton from "./CreateButton";
import Description from "./Description";
import Price from "./Price";
import { useMask } from "@/hooks/useMask";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

export default function CreatePage() {
  const { masks, svgRef, maskId, inputRef, titleRef } = useMask();
  const { createModeActive } = useZoraCreateProvider();

  return (
    <main className="w-screen grow">
      <div className="flex flex-col items-center justify-center pt-[200px]">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-20 mt-4 relative">
            {createModeActive && (
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
            )}
            <div className="pl-20 h-fit">
              <div ref={titleRef} className="flex items-end gap-3 w-fit">
                <p className="font-archivo text-4xl font-bold">new moment</p>
                {createModeActive && (
                  <>
                    <div className="size-2 rotate-[45deg] bg-black translate-y-[-8px]" />
                    <p className="font-grotesk-light text-xl tracking-[-1px]">
                      create
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center gap-5">
              <MetadataCreation />
            </div>
            <div className="w-full pr-20">
              <div className="w-full space-y-3" ref={inputRef}>
                <Title />
                <Description />
                <Price />
                <CreateButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
