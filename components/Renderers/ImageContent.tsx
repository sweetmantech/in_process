import BlurImage from "@/components/BlurImage";

interface ImageContentProps {
  rawImageUri: string;
  alt: string;
  variant: "fill" | "natural";
}

const ImageContent = ({ rawImageUri, alt, variant }: ImageContentProps) => {
  const src = rawImageUri;

  if (!src) {
    return (
      <div className="flex size-full items-center justify-center p-4 text-center bg-white min-h-32">
        <p className="text-grey-moss-400 text-xl">No preview</p>
      </div>
    );
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
