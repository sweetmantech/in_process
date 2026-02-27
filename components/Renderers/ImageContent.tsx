import BlurImage from "@/components/BlurImage";
import { usePathname } from "next/navigation";

interface ImageContentProps {
  rawAnimationUri: string;
  rawImageUri: string;
  alt: string;
  variant: "fill" | "natural";
}

const ImageContent = ({ rawAnimationUri, rawImageUri, alt, variant }: ImageContentProps) => {
  const pathname = usePathname();
  const isCollect = pathname.includes("/collect");
  const src = (isCollect && rawAnimationUri) || rawImageUri || "/images/placeholder.png";

  if (variant === "natural") {
    return (
      <BlurImage
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="(max-width: 768px) 100vw, 800px"
        draggable={false}
        style={{ width: "100%", height: "auto" }}
      />
    );
  }

  return (
    <BlurImage
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 800px"
      draggable={false}
      style={{ objectFit: "contain", objectPosition: "center" }}
    />
  );
};

export default ImageContent;
