"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { slides } from "./OnboardingModalContent";
import { SlideContent } from "./SlideContent";
import { NavigationDots } from "./NavigationDots";
import { NavigationArrows } from "./NavigationArrows";
import { useRouter } from "next/navigation";
import useConnectedWallet from "@/hooks/useConnectedWallet";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({
  isOpen,
  onClose,
}: OnboardingModalProps) {
  const { connectedWallet } = useConnectedWallet();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLastSlide = currentSlide === slides.length - 1;
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const isMobile = window.innerWidth <= 768;
      setCurrentSlide(isMobile ? slides.length - 1 : 0);
    }
  }, [isOpen, connectedWallet]);

  const handleAdvance = () => {
    if (isLastSlide) {
      router.push(`/${connectedWallet}?editing=true`);
      return;
    }
    setCurrentSlide((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#FEFEFE] bg-opacity-80 flex items-center justify-center z-50">
      <div
        className={`bg-white p-8 max-w-[574px] h-[450px] w-full m-4 relative shadow-[rgba(27,21,4,0.09)_-1px_4px_64px_16px]`}
        onClick={handleAdvance}
      >
        <button onClick={onClose} className="absolute right-4 top-4 p-1">
          <Image
            src="/images/close-icon.svg"
            alt="Close"
            width={24}
            height={24}
            priority
            unoptimized
          />
        </button>

        <SlideContent currentSlide={currentSlide} />
        <NavigationArrows
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentSlide={currentSlide}
        />

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center gap-3">
          {isLastSlide ? (
            <Button
              onClick={handleAdvance}
              className="px-16 py-2 h-12 text-md bg-grey-moss-900 hover:bg-grey-moss-300 text-[#FFF9EA] text-[22px] font-normal rounded-sm"
            >
              start
            </Button>
          ) : (
            <NavigationDots
              currentSlide={currentSlide}
              onSlideChange={setCurrentSlide}
            />
          )}
        </div>
      </div>
    </div>
  );
}
