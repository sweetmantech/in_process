import { usePrivy } from "@privy-io/react-auth";

export function LoginButton() {
  const { login, ready, authenticated, logout } = usePrivy();

  if (!ready) return null;

  return (
    <button
      onClick={authenticated ? logout : login}
      className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition-opacity"
    >
      {authenticated ? "Disconnect" : "Connect"}
    </button>
  );
}
