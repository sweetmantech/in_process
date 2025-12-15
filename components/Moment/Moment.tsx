import useIsMobile from "@/hooks/useIsMobile";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";

const Moment = ({ children }: { children: ReactNode }) => {
  const { createdTokenId } = useMomentCreateProvider();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const gridVisible = useMemo(() => {
    if (pathname === "/create/link" && isMobile) return false;
    if (pathname === "/create/embed" && isMobile) return false;
    if (createdTokenId) return false;
    return true;
  }, [pathname, isMobile, createdTokenId]);
  const isWritingPage = pathname === "/create/writing";
  const isCreatingPage = pathname === "/create";

  return (
    <div
      className={`w-full ${createdTokenId ? (isWritingPage || isCreatingPage ? "min-h-[300px]" : "min-h-auto") : "min-h-[400px]"} md:min-h-auto relative md:aspect-[571/692] ${gridVisible && "bg-[url('/grid.svg')]"} bg-contain`}
    >
      {children}
    </div>
  );
};

export default Moment;
