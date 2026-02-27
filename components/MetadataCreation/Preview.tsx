import useIsMobile from "@/hooks/useIsMobile";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import useTypeParam from "@/hooks/useTypeParam";
import { ReactNode, useMemo } from "react";

const Preview = ({ children }: { children: ReactNode }) => {
  const { createdTokenId } = useMomentCreateProvider();
  const type = useTypeParam();
  const isMobile = useIsMobile();
  const gridVisible = useMemo(() => {
    if (type === "link" && isMobile) return false;
    if (type === "embed" && isMobile) return false;
    if (createdTokenId) return false;
    return true;
  }, [type, isMobile, createdTokenId]);
  const isWritingPage = type === "writing";
  const isCreatingPage = !type;

  return (
    <div
      className={`w-full ${createdTokenId ? (isWritingPage || isCreatingPage ? "min-h-[300px]" : "min-h-auto") : "min-h-[400px]"} md:min-h-auto relative md:aspect-[571/692] overflow-hidden ${gridVisible && "bg-[url('/grid.svg')]"} bg-contain`}
    >
      {children}
    </div>
  );
};

export default Preview;
