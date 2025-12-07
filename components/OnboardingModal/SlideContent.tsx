import Image from "next/image";
import { slides } from "./OnboardingModalContent";

interface SlideContentProps {
  currentSlide: number;
}

export const SlideContent = ({ currentSlide }: SlideContentProps) => (
  <>
    <div className="mb-4 text-center">
      <h2 className="mb-2 pt-8 font-archivo-medium text-[32px] tracking-[-5%]">
        {slides[currentSlide].title}
      </h2>
      <p className="font-spectral-medium-italic text-[24px] tracking-[-5%] text-black">
        {slides[currentSlide].subtitle}
      </p>
    </div>
    <div className="mb-6 flex justify-center">
      <Image
        src={`/${slides[currentSlide].img}`}
        alt="Decorative images"
        width={slides[currentSlide].width}
        height={slides[currentSlide].height}
        className="object-contain"
        priority
        unoptimized
      />
    </div>
  </>
);
