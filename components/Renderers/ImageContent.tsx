import BlurImage from "@/components/BlurImage";
import NoPreview from "@/components/NoPreview";

interface ImageContentProps {
  rawImageUri: string;
  alt: string;
  variant: "fill" | "natural";
}

const ImageContent = ({ rawImageUri, alt, variant }: ImageContentProps) => {
  const src = rawImageUri;

  if (!src) {
    return <NoPreview className="min-h-32" />;
  }

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
