"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const slides = [
  {
    title: "share moments in posts",
    subtitle: "don't overthink it",
    img: "modal-stars.png"
  },
  {
    title: "write your thoughts",
    subtitle: "say anything",
    img: "modal-lines.png"
  },
  {
    title: "memories make a timeline",
    subtitle: "moments are collected",
    img: "modal-timeline.png"
  },
  {
    title: "create your profile",
    subtitle: "be who you are",
    img: "modal-clouds.png"
  }
];

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLastSlide = currentSlide === slides.length - 1;

  const handleAdvance = () => {
    if (isLastSlide) return; // Don't advance on last slide click
    setCurrentSlide(prev => prev + 1);
  };

  useEffect(() => {
    console.log('Modal visibility changed:', { isOpen });
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#FEFEFE] bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-8 max-w-[574px] h-[450px] w-full m-4 relative shadow-[rgba(27,21,4,0.09)_-1px_4px_64px_16px]" onClick={handleAdvance}>
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 p-1"
        >
          <Image
            src="/close-icon.svg"
            alt="Close"
            width={24}
            height={24}
            priority
          />
        </button>


        {/* Content */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] mb-2 pt-8">
            {slides[currentSlide].title}
          </h2>
          <p className="text-xl font-spectral-italic tracking-[-5%] text-gray-600">
            {slides[currentSlide].subtitle}
          </p>
        </div>
        {/* Stars decoration */}
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

        {/* Navigation - Show either dots or button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center gap-3">
          {isLastSlide ? (
            <button
              onClick={onClose}
              className="bg-black text-white px-8 py-2 rounded-sm text-md"
            >
              start
            </button>
          ) : (
            // Only show first 3 dots
            slides.slice(0, 3).map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal click from triggering
                  setCurrentSlide(index);
                }}
              >
                <Image
                  src={index === currentSlide ? "/modal-dot-active.svg" : "/modal-dot.svg"}
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