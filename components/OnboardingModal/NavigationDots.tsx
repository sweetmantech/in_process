import Image from "next/image";
import { slides } from "./OnboardingModalContent";

interface NavigationDotsProps {
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

export const NavigationDots = ({
  currentSlide,
  onSlideChange,
}: NavigationDotsProps) => (
  <>
    {slides.slice(0, 3).map((_, index) => (
      <button
        key={index}
        onClick={(e) => {
          e.stopPropagation();
          onSlideChange(index);
        }}
      >
        <Image
          src={
            index === currentSlide
              ? "/images/modal-dot-active.svg"
              : "images/modal-dot.svg"
          }
          alt={`Slide ${index + 1}`}
          width={16}
          height={16}
          priority
          unoptimized
        />
      </button>
    ))}
  </>
);
