import Image from "next/image";
import { useImageTransform } from "@/hooks/useImageTransform";

interface PreviewImageProps {
  src: string;
  transform: {
    scale: number;
    offset: { x: number; y: number };
  };
}

export const PreviewImage = ({ src, transform }: PreviewImageProps) => {
  const { getImageStyle } = useImageTransform();
  const imageStyle = getImageStyle(transform);

  return (
    <div style={imageStyle}>
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        src={src}
        alt="not found preview."
      />
    </div>
  );
}; 