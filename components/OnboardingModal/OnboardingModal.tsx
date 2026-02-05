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

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const { privyWallet } = useConnectedWallet();
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLastSlide = currentSlide === slides.length - 1;
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const isMobile = window.innerWidth <= 768;
      setCurrentSlide(isMobile ? slides.length - 1 : 0);
    }
  }, [isOpen, privyWallet]);

  const handleAdvance = () => {
    if (isLastSlide) {
      router.push(`/${privyWallet?.address}?editing=true`);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FEFEFE] bg-opacity-80">
      <div
        className={`relative m-4 h-[450px] w-full max-w-[574px] bg-white p-8 shadow-[rgba(27,21,4,0.09)_-1px_4px_64px_16px]`}
        onClick={handleAdvance}
      >
        <button onClick={onClose} className="absolute right-4 top-4 p-1">
          <Image src="/images/close-icon.svg" alt="Close" width={24} height={24} priority />
        </button>

        <SlideContent currentSlide={currentSlide} />
        <NavigationArrows
          onPrevious={handlePrevious}
          onNext={handleNext}
          currentSlide={currentSlide}
        />

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform justify-center gap-3">
          {isLastSlide ? (
            <Button
              onClick={handleAdvance}
              className="text-md h-12 rounded-sm bg-grey-moss-900 px-16 py-2 text-[22px] font-normal text-[#FFF9EA] hover:bg-grey-moss-300"
            >
              start
            </Button>
          ) : (
            <NavigationDots currentSlide={currentSlide} onSlideChange={setCurrentSlide} />
          )}
        </div>
      </div>
    </div>
  );
}
