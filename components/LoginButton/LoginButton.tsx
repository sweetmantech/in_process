"use client";

import { useFrameProvider } from "@/providers/FrameProvider";
import { PrivyButton } from "./PrivyButton";
import { WarpcastButton } from "./WarpcastButton";

interface LoginButtonProps {
  className?: string;
  toggle: () => void;
  isOpenDropDown: boolean;
}
export function LoginButton({
  className = "",
  toggle,
  isOpenDropDown,
}: LoginButtonProps) {
  const { context } = useFrameProvider();

  if (context)
    return (
      <WarpcastButton
        className={className}
        toggle={toggle}
        isOpenDropDown={isOpenDropDown}
      />
    );

  return (
    <PrivyButton
      className={className}
      toggle={toggle}
      isOpenDropDown={isOpenDropDown}
    />
  );
}
