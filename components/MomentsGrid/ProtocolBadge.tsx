import { Protocol } from "@/types/moment";

interface ProtocolBadgeProps {
  protocol: Protocol;
}

const ProtocolBadge = ({ protocol }: ProtocolBadgeProps) => {
  if (!protocol) return null;

  return (
    <span className="rounded bg-black/50 px-1.5 py-0.5 font-archivo text-xs text-white backdrop-blur-sm">
      {protocol}
    </span>
  );
};

export default ProtocolBadge;
