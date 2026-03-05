interface ProtocolBadgeProps {
  protocol: "in_process" | "catalog" | null;
}

const PROTOCOL_LABEL: Record<string, string> = {
  in_process: "In Process",
  catalog: "Catalog",
};

const ProtocolBadge = ({ protocol }: ProtocolBadgeProps) => {
  if (!protocol) return null;

  return (
    <span className="rounded bg-black/50 px-1.5 py-0.5 font-archivo text-xs text-white backdrop-blur-sm">
      {PROTOCOL_LABEL[protocol] ?? protocol}
    </span>
  );
};

export default ProtocolBadge;
