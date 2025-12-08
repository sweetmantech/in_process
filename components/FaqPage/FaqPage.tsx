"use client";

import { faqSections } from "@/lib/faq/faqContent";
import { faqImageGalleries } from "@/lib/faq/faqImages";
import FaqHeader from "./FaqHeader";
import FaqSection from "./FaqSection";
import ImageGallery from "./ImageGallery";

const FaqPage = () => {
  const {
    main: faqData,
    additional: additionalFaqData,
    final: finalFaqData,
    community: communityFaqData,
  } = faqSections;

  return (
    <div className="relative flex w-full grow justify-center px-2 pt-8 md:px-6 md:pt-16">
      <div className="w-full max-w-full px-4 md:mx-20 md:px-20">
        <FaqHeader />

        <FaqSection faqData={faqData} />

        <div className="md:mt-18 mt-14 px-1 md:px-2">
          <ImageGallery images={faqImageGalleries.timelineExamples} />
        </div>

        <div className="md:mt-18 mt-14">
          <FaqSection faqData={additionalFaqData} />
        </div>

        <div className="md:mt-18 mt-14 px-1 md:px-2">
          <ImageGallery images={faqImageGalleries.contentTypes} />
        </div>

        <div className="md:mt-18 mt-14">
          <FaqSection faqData={finalFaqData} />
        </div>

        <div className="px-1 md:px-2">
          <ImageGallery
            images={faqImageGalleries.gettingStarted.slice(0, 2)}
            captionClassName="font-spectral lowercase text-left font-medium tracking-tight text-[#1B1504] text-[14px] md:text-[20px] ml-6 md:ml-4"
          />
        </div>

        <div className="mt-8 px-1 md:mt-12 md:px-2">
          <ImageGallery
            images={faqImageGalleries.gettingStarted.slice(2, 4)}
            captionClassName="font-spectral lowercase text-left font-medium tracking-tight text-[#1B1504] text-[14px] md:text-[20px] ml-6 md:ml-4"
          />
        </div>

        <div className="mt-8 px-1 md:mt-12 md:px-2">
          <ImageGallery
            images={faqImageGalleries.gettingStarted.slice(4, 6)}
            captionClassName="font-spectral lowercase text-left font-medium tracking-tight text-[#1B1504] text-[14px] md:text-[20px] ml-6 md:ml-4"
          />
        </div>

        <div className="md:mt-18 mt-14">
          <FaqSection faqData={communityFaqData} />
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
