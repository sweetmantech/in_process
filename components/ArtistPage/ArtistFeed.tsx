"use client";

import { FC, useState } from "react";
import Image from "next/image";

const ArtistFeed: FC = () => {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="relative h-16">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2" />
        <div className="relative flex justify-between items-center h-full w-full">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="relative">
              <button
                className="w-5 h-5 bg-black rounded-full relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 transition-transform hover:scale-110"
                onMouseEnter={() => setHoveredEvent(i)}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <span className="sr-only">{`ITEM ${i + 1}`}</span>
              </button>
              {hoveredEvent === i && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white shadow-lg rounded-lg p-2 md:p-4 transition-opacity duration-200 ease-in-out">
                  <div className="w-[60px] md:w-[150px] aspect-[1/1] overflow-hidden relative">
                    <Image
                      src={`/${(i % 3) + 1}.avif`}
                      alt={`ITEM ${i + 1}`}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </div>
                  <h3 className="font-semibold text-sm text-center">
                    {`ITEM ${i + 1}`}
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistFeed;
