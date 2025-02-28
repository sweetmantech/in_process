"use client";

import Image from "next/image";
import React, { ReactNode, useState } from "react";

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BgNoiseWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`pointer-events-none absolute size-full overflow-hidden
        ${loaded ? "bg-tan" : "bg-none"}`}
      >
        <Image
          src="/noise.png"
          layout="fill"
          alt="not found bg"
          className="object-cover"
          onLoad={() => setLoaded(true)}
          blurDataURL="/noise.png"
        />
      </div>
      {children}
    </div>
  );
};

export default BgNoiseWrapper;
