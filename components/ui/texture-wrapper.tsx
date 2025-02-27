import React, { ReactNode } from "react";

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BgNoiseWrapper: React.FC<BackgroundWrapperProps> = ({ children }) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute size-full bg-cover bg-top bg-[url('/noise.png')]" />
      <div className="relative">{children}</div>
    </div>
  );
};

export default BgNoiseWrapper;
