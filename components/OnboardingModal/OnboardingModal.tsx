"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import { slides } from './OnboardingModalContent';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLastSlide = currentSlide === slides.length - 1;

  useEffect(() => {
    if (isOpen) {
      setCurrentSlide(0);
    }
  }, [isOpen]);

  const handleAdvance = () => {
    if (isLastSlide) return;
    setCurrentSlide(prev => prev + 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#FEFEFE] bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-8 max-w-[574px] h-[450px] w-full m-4 relative shadow-[rgba(27,21,4,0.09)_-1px_4px_64px_16px]" onClick={isLastSlide ? undefined : handleAdvance}>
        <button onClick={onClose} className="absolute right-4 top-4 p-1">
          <Image
            src="/images/close-icon.svg"
            alt="Close"
            width={24}
            height={24}
            priority
          />
        </button>
        <div className="text-center mb-12">
          <h2 className="text-[32px] mb-2 pt-8">
            {slides[currentSlide].title}
          </h2>
          <p className="text-xl font-spectral-italic tracking-[-5%] text-gray-600">
            {slides[currentSlide].subtitle}
          </p>
        </div>
        <div className="flex justify-center mb-6">
          <Image
            src={`/${slides[currentSlide].img}`}
            alt="Decorative images"
            width={420}
            height={141}
            className="object-contain"
            priority
          />
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center gap-3">
          {isLastSlide ? ( <Button onClick={onClose} className="px-8 py-2 text-md bg-black hover:bg-grey-moss-300 text-white rounded-sm">
              start
            </Button>
          ) : (
            slides.slice(0, 3).map((_, index) => (
              <button key={index}
                onClick={(e) => {
                  e.stopPropagation(); 
                  setCurrentSlide(index);
                }}
              >
                <Image
                  src={index === currentSlide ? "/images/modal-dot-active.svg" : "images/modal-dot.svg"}
                  alt={`Slide ${index + 1}`}
                  width={16}
                  height={16}
                  priority
                />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 