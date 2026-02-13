import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { TokenMetadataJson } from "@/lib/protocolSdk/ipfs/types";
import { determineMediaType } from "@/lib/zora/utils";
import BlurImage from "@/components/BlurImage";
import TextMomentPreview from "./TextMomentPreview";
import FilmPlaceholder from "@/components/VideoPlayer/FilmPlaceholder";
import PdfMomentPreview from "./PdfMomentPreview";

interface PreviewProps {
  data: TokenMetadataJson;
}

const Preview = ({ data }: PreviewProps) => {
  const mediaType = data.content?.mime ? determineMediaType(data.content.mime) : null;
  const hasImage = !!getFetchableUrl(data.image);

  if (!hasImage && mediaType === "text") return <TextMomentPreview data={data} />;
  if (!hasImage && mediaType === "pdf") return <PdfMomentPreview data={data} />;

  if (!hasImage && mediaType === "video") {
    const label = data.name || data.description;
    return (
      <div className="absolute inset-0 z-[1] flex flex-col transition-transform duration-300 group-hover:scale-[1.02]">
        <div className="flex-1 [&>div]:!aspect-auto [&>div]:!h-full [&>div]:!rounded-none">
          <FilmPlaceholder />
        </div>
        {label && (
          <div className="bg-neutral-900 px-3 py-2">
            <p className="line-clamp-2 font-archivo text-xs text-neutral-300">{label}</p>
          </div>
        )}
      </div>
    );
  }

  if (!hasImage) {
    return (
      <div className="absolute inset-0 z-[1] flex items-center justify-center overflow-hidden bg-grey-eggshell p-6 transition-transform duration-300 group-hover:scale-[1.02]">
        <p className="line-clamp-[6] text-center font-spectral text-sm leading-relaxed text-grey-moss-900">
          {data.name || data.description || "Moment"}
        </p>
      </div>
    );
  }

  return (
    <BlurImage
      src={getFetchableUrl(data.image)!}
      alt={data.name || "Moment image"}
      className="z-[1] transition-transform duration-300 group-hover:scale-[1.02]"
      fill
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      style={{ objectFit: "cover", objectPosition: "center" }}
    />
  );
};

export default Preview;
