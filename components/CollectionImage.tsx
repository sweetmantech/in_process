"use client";

import { cn } from "@/lib/utils";
import BlurImage from "@/components/BlurImage";

interface CollectionImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
  className?: string;
}

const CollectionImage = ({ src, alt, onClick, className }: CollectionImageProps) => {
  return (
    <div
      className={cn(
        "relative h-10 w-10 shrink-0 overflow-hidden rounded border border-grey-moss-100",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <BlurImage src={src} alt={alt} fill className="object-cover p-1" sizes="40px" />
    </div>
  );
};

export default CollectionImage;
