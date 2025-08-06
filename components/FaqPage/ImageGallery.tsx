import Image from "next/image";
import { ImageGalleryItem } from "@/data/faqImages";

interface ImageGalleryProps {
  images: ImageGalleryItem[];
  isStepsGallery?: boolean;
}

const ImageGallery = ({
  images,
  isStepsGallery = false,
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
              className={`font-spectral lowercase text-[16px] leading-[100%] md:text-[24px] ml-2 md:ml-4 text-left ${
                isStepsGallery
                  ? "text-[14px] md:text-[20px] ml-6 md:ml-4"
                  : "text-grey-moss-500 italic"
              } ${image.caption.includes("Start your process") ? "pr-10" : ""}`}
              style={{
                fontWeight: 500,
                letterSpacing: "-5%",
                color: isStepsGallery
                  ? "rgba(27, 21, 4, 1)"
                  : "rgba(78, 78, 78, 1)",
              }}
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
