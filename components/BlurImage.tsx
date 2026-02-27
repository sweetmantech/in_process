"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import getBlurUrl from "@/lib/media/getBlurUrl";

type BlurImageProps = ImageProps & {
  src: string;
};

const BlurImage = ({ src, className = "", alt, ...props }: BlurImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const blurUrl = getBlurUrl(src);
  const hasFill = "fill" in props && props.fill;

  // For local images or when blur URL can't be generated, use regular Image
  if (!blurUrl) {
    return <Image src={src} alt={alt} className={className} {...props} />;
  }

  // For fill images
  if (hasFill) {
    return (
      <>
        {/* Low-quality blur image - unoptimized to avoid double-processing */}
        <Image
          {...props}
          src={blurUrl}
          alt={alt}
          className={`${className} blur-sm transition-opacity duration-500 ${isLoaded ? "opacity-0" : "opacity-100"}`}
          priority
          unoptimized
        />
        {/* High-quality image */}
        <Image
          {...props}
          src={src}
          alt={alt}
          className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
        />
      </>
    );
  }

  // For width/height images
  return (
    <div className="relative">
      {/* Low-quality blur image - in-flow initially so container has height before main image loads */}
      <Image
        {...props}
        src={blurUrl}
        alt={alt}
        className={`${className} blur-sm transition-opacity duration-500 ${isLoaded ? "absolute inset-0 opacity-0" : "opacity-100"}`}
        priority
        unoptimized
      />
      {/* High-quality image - absolutely positioned until loaded so it doesn't collapse the container */}
      <Image
        {...props}
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "absolute inset-0 opacity-0"}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default BlurImage;
