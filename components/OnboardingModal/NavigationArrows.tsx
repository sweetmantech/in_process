import Image from "next/image";
import { slides } from "./OnboardingModalContent";

interface NavigationArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  currentSlide: number;
}

export const NavigationArrows = ({
  onPrevious,
  onNext,
  currentSlide,
}: NavigationArrowsProps) => (
  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 hidden md:flex justify-between px-4 ">
    <div>
      {currentSlide > 0 && (
        <button
          className="p-2"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
        >
          <Image
            src="/images/left-arrow.svg"
            alt="Previous slide"
            width={9}
            height={25}
            className="object-contain"
          />
        </button>
      )}
    </div>
    <div>
      {currentSlide < slides.length - 1 && (
        <button
          className="p-2"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        >
          <Image
            src="/images/right-arrow.svg"
            alt="Next slide"
            width={11}
            height={25}
            className="object-contain"
          />
        </button>
      )}
    </div>
  </div>
);
