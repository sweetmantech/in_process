import Image from "next/image";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

interface ImagePreviewProps {
  src: string;
  alt: string;
}

const ImagePreview = ({ src, alt }: ImagePreviewProps) => {
  const { previewPosition, previewScale } = useZoraCreateProvider();

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        layout="fill"
        objectFit="cover"
        src={src}
        alt={alt}
        style={{
          transform: `translate(${previewPosition.x}px, ${previewPosition.y}px) scale(${previewScale})`,
          transition: "transform 0.1s ease-out",
        }}
        draggable={false}
      />
      {/* Crop indication border */}
      <div className="absolute inset-0 border border-red-500 pointer-events-none opacity-50" />
    </div>
  );
};

export default ImagePreview; 