import Image from "next/image";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

interface CropPreviewProps {
  src: string;
  alt: string;
}

const CropPreview = ({ src, alt }: CropPreviewProps) => {
  const { previewPosition, previewScale } = useZoraCreateProvider();

  return (
    <div className="size-full overflow-hidden">
      <div 
        className="relative w-full h-full"
        style={{
          transform: `translate(${previewPosition.x}px, ${previewPosition.y}px) scale(${previewScale})`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
          draggable={false}
        />
      </div>
    </div>
  );
};

export default CropPreview; 