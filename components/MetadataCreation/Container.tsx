import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => (
  <div className={`flex size-full justify-center ${className}`}>{children}</div>
);

export default Container;
