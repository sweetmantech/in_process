import { usePrivy } from "@privy-io/react-auth";

export function LoginButton() {
  const { login, ready, authenticated } = usePrivy();

  if (!ready || authenticated) return null;

  return (
    <button
      onClick={login}
      className="px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
    >
      Connect Wallet
    </button>
  );
}
