import { cn } from "@/lib/utils";

export default function Spinner({ className = "size-4" }: { className?: string }) {
  return <div className={cn("animate-spin rounded-full border-b-2 border-black", className)} />;
}
