import Image from "next/image";
import { ImageGalleryItem } from "@/lib/faq/faqImages";
import { getCaptionClasses } from "@/lib/faq/getCaptionClasses";

const DEFAULT_CAPTION_CLASSNAME = "font-spectral lowercase text-left font-medium tracking-tight text-[#4E4E4E] text-[16px] leading-[100%] md:text-[24px] ml-2 md:ml-4 italic antialiased";

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
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-start items-start">
          {images.map((image, index) => (
            <div
              key={index}
              className="space-y-4 items-start w-full lg:w-1/2 lg:max-w-none"
            >
              <div className="flex justify-center md:justify-start">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={800}
                  height={500}
                  quality={100}
                  priority={index === 0}
                  className="w-full h-auto rounded-sm -ml-2 md:-ml-5 object-contain"
                />
              </div>
              <p
                className={`${captionClassName} ${getCaptionClasses(image.caption)}`}
              >
                {image.caption}
              </p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default ImageGallery;
