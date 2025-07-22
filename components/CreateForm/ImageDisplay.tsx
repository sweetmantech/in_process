import Image from "next/image";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

interface ImageDisplayProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageDisplay = ({ src, alt, className = "" }: ImageDisplayProps) => {
  const { imagePosition, imageScale } = useZoraCreateProvider();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          src={src}
          alt={alt}
          draggable={false}
          style={{ pointerEvents: "none" }}
        />
      </div>
    </div>
  );
};

export default ImageDisplay; 