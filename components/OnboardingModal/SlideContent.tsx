import Image from "next/image";
import { slides } from "./OnboardingModalContent";

interface SlideContentProps {
  currentSlide: number;
}

export const SlideContent = ({ currentSlide }: SlideContentProps) => (
  <>
    <div className="text-center mb-4">
      <h2 className="text-[32px] mb-2 pt-8">{slides[currentSlide].title}</h2>
      <p className="text-xl font-spectral-italic tracking-[-5%] text-gray-600">
        {slides[currentSlide].subtitle}
      </p>
    </div>
    <div className="flex justify-center mb-6">
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
