"use client";

import Header from "../Header";
import Footer from "../Footer";
import { ReactNode } from "react";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Layout = ({ children }: { children: ReactNode }) => {
  const { isOpenNavbar } = useLayoutProvider();
  const pathname = usePathname();
  const isTextureLayout = !pathname.includes("/create");

  return (
    <div
      className={cn(
        "grow flex flex-col",
        isOpenNavbar && "h-screen overflow-hidden",
        isTextureLayout &&
          "bg-[url('/bg-gray.png')] bg-cover bg-top bg-no-repeat bg-fixed",
      )}
    >
      <Header />
      <div className="grow relative flex flex-col">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
