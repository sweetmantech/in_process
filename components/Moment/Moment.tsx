import useIsMobile from "@/hooks/useIsMobile";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";

const Moment = ({ children }: { children: ReactNode }) => {
  const { createdContract } = useZoraCreateProvider();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const gridVisible = useMemo(() => {
    if (pathname === "/create/link" && isMobile) return false;
    if (pathname === "/create/embed" && isMobile) return false;
    if (createdContract) return false;
    return true;
  }, [pathname, isMobile, createdContract]);
  return (
    <div
      className={`w-full ${createdContract ? "min-h-auto" : "min-h-[400px]"} md:min-h-auto md:aspect-[571/692] relative ${gridVisible && "bg-[url('/grid.svg')]"} bg-contain`}
    >
      {children}
    </div>
  );
};

export default Moment;
