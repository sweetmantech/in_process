import { TokenMetadataJson } from "@/lib/protocolSdk/ipfs/types";
import { FileText } from "lucide-react";

interface PdfMomentPreviewProps {
  data: TokenMetadataJson;
}

const PdfMomentPreview = ({ data }: PdfMomentPreviewProps) => {
  return (
    <div className="absolute inset-0 z-[1] flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-red-50 to-red-100 transition-transform duration-300 group-hover:scale-[1.02]">
      <div className="relative flex size-16 items-center justify-center">
        <FileText className="size-12 text-red-400" />
        <span className="absolute -bottom-1 rounded bg-red-500 px-1.5 py-0.5 font-archivo text-[10px] font-bold uppercase text-white">
          PDF
        </span>
      </div>
      <p className="line-clamp-2 px-4 text-center font-archivo text-xs text-red-900/60">
        {data.name || "PDF Moment"}
      </p>
    </div>
  );
};

export default PdfMomentPreview;
