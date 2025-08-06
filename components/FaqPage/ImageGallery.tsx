import Image from "next/image";
import { ImageGalleryItem } from "@/lib/faq/faqImages";

const DEFAULT_CAPTION_CLASSNAME = "font-spectral lowercase text-left font-medium tracking-tight text-[#4E4E4E] text-[16px] leading-[100%] md:text-[24px] ml-2 md:ml-4 italic antialiased";

const getCaptionClasses = (captionClassName: string, caption: string) => {
  return `${captionClassName} ${caption.includes("Start your process") ? "pr-10" : ""}`;
};

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
        <div className="flex flex-col 2xl:flex-row gap-4 2xl:gap-2 justify-start items-start">
          {images.map((image, index) => (
            <div
              key={index}
              className="space-y-4 items-start w-full 2xl:w-1/2 2xl:max-w-none"
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
                className={`${captionClassName} ${getCaptionClasses(captionClassName, image.caption)}`}
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
