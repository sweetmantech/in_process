"use client";
import CreateForm from "@/components/CreateForm";
import CreateModeSelect from "@/components/CreateModeSelect";
import MaskLines from "@/components/CreateModeSelect/MaskLines";
import useIsMobile from "@/hooks/useIsMobile";
import { ZoraCreateProvider } from "@/providers/ZoraCreateProvider";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const gridVisible = useMemo(() => {
    if (pathname === "/create/link" && isMobile) return false;
    if (pathname === "/create/embed" && isMobile) return false;
    return true;
  }, [pathname, isMobile]);

  return (
    <ZoraCreateProvider>
      <main className="w-screen grow">
        <div className="relative w-full mt-12 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 px-3 md:px-10">
          <MaskLines />
          <CreateModeSelect />
          <div
            className={`w-full min-h-[400px] md:min-h-auto md:aspect-[571/692] relative ${gridVisible && "bg-[url('/grid.svg')]"} bg-contain`}
          >
            {children}
          </div>
          <CreateForm />
        </div>
      </main>
    </ZoraCreateProvider>
  );
};

export default RootLayout;
