"use client";

import { useFrameProvider } from "@/providers/FrameProvider";
import { PrivyButton } from "./PrivyButton";
import { WarpcastButton } from "./WarpcastButton";

interface LoginButtonProps {
  className?: string;
}
export function LoginButton({ className = "" }: LoginButtonProps) {
  const { context } = useFrameProvider();

  if (context) return <WarpcastButton className={className} />;

  return <PrivyButton className={className} />;
}
