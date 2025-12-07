import Image from "next/image";
import { ImageGalleryItem } from "@/lib/faq/faqImages";
import { getCaptionClasses } from "@/lib/faq/getCaptionClasses";

const DEFAULT_CAPTION_CLASSNAME =
  "font-spectral lowercase text-left font-medium tracking-tight text-[#4E4E4E] text-[16px] leading-[100%] md:text-[24px] ml-2 md:ml-4 italic antialiased";

interface ImageGalleryProps {
  images: ImageGalleryItem[];
  captionClassName?: string;
}

const ImageGallery = ({
  images,
  captionClassName = DEFAULT_CAPTION_CLASSNAME,
}: ImageGalleryProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start justify-start gap-4 lg:flex-row lg:gap-6">
        {images.map((image, index) => (
          <div key={index} className="w-full items-start space-y-4 lg:w-1/2 lg:max-w-none">
            <div className="flex justify-center md:justify-start">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={500}
                quality={100}
                priority={index === 0}
                className="-ml-2 h-auto w-full rounded-sm object-contain md:-ml-5"
              />
            </div>
            <p className={`${captionClassName} ${getCaptionClasses(image.caption)}`}>
              {image.caption}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
