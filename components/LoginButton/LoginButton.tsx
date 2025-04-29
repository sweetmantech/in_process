"use client";

import { useFrameProvider } from "@/providers/FrameProvider";
import { PrivyButton } from "./PrivyButton";
import { WarpcastButton } from "./WarpcastButton";

interface LoginButtonProps {
  className?: string;
  toggle: () => void;
  isOpenNavbar: boolean;
}
export function LoginButton({
  className = "",
  toggle,
  isOpenNavbar,
}: LoginButtonProps) {
  const { context } = useFrameProvider();

  if (context)
    return (
      <WarpcastButton
        className={className}
        toggle={toggle}
        isOpenNavbar={isOpenNavbar}
      />
    );

  return (
    <PrivyButton
      className={className}
      toggle={toggle}
      isOpenNavbar={isOpenNavbar}
    />
  );
}
