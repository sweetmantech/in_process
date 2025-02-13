"use client";

import { usePrivy } from "@privy-io/react-auth";

interface LoginButtonProps {
  className?: string;
}
export function LoginButton({ className = "" }: LoginButtonProps) {
  const { login, ready, authenticated, logout } = usePrivy();

  if (!ready) return null;

  return (
    <button
      onClick={authenticated ? logout : login}
      className={`px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition-opacity ${className}`}
    >
      {authenticated ? "Disconnect" : "Connect"}
    </button>
  );
}
