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
    <div className="relative pt-8 md:pt-16 flex justify-center grow w-full px-2  md:px-6">
      <div className="w-full max-w-full md:mx-20 px-4 md:px-20">
        <FaqHeader />

        <FaqSection faqData={faqData} />

        <div className="mt-14 md:mt-18 px-1 md:px-2">
          <ImageGallery images={faqImageGalleries.timelineExamples} />
        </div>

        <div className="mt-14 md:mt-18">
          <FaqSection faqData={additionalFaqData} />
        </div>

        <div className="mt-14 md:mt-18 px-1 md:px-2">
          <ImageGallery images={faqImageGalleries.contentTypes} />
        </div>

        <div className="mt-14 md:mt-18">
          <FaqSection faqData={finalFaqData} />
        </div>

        <div className="px-1 md:px-2">
          <ImageGallery
            images={faqImageGalleries.gettingStarted.slice(0, 2)}
            captionClassName="font-spectral lowercase text-left font-medium tracking-tight text-[#1B1504] text-[14px] md:text-[20px] ml-6 md:ml-4"
          />
        </div>

        <div className="mt-8 md:mt-12 px-1 md:px-2">
          <ImageGallery
            images={faqImageGalleries.gettingStarted.slice(2, 4)}
            captionClassName="font-spectral lowercase text-left font-medium tracking-tight text-[#1B1504] text-[14px] md:text-[20px] ml-6 md:ml-4"
          />
        </div>

        <div className="mt-8 md:mt-12 px-1 md:px-2">
          <ImageGallery
            images={faqImageGalleries.gettingStarted.slice(4, 6)}
            captionClassName="font-spectral lowercase text-left font-medium tracking-tight text-[#1B1504] text-[14px] md:text-[20px] ml-6 md:ml-4"
          />
        </div>

        <div className="mt-14 md:mt-18">
          <FaqSection faqData={communityFaqData} />
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
