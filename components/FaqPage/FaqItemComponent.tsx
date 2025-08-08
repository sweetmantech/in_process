"use client";

import { FaqItem } from "@/lib/faq/faqContent";
import { RenderLine } from "./RenderLine";

interface FaqItemComponentProps {
  faq: FaqItem;
  index: number;
}

const FaqItemComponent = ({ faq, index }: FaqItemComponentProps) => {
  return (
    <div key={index} className="pb-6">
      <h2 className="font-archivo lowercase mb-4 text-[20px] leading-[110%] md:text-[36px] md:leading-[160%] font-medium tracking-[-0.05em] text-[#1b1504] antialiased">
        {faq.question}
      </h2>
      <div className="font-spectral whitespace-pre-line lowercase max-w-6xl text-[14px] leading-[200%] md:text-[18px] tracking-[-0.05em] antialiased">
        {faq.answer
          .split("\n")
          .map((line, lineIndex) => RenderLine(line, lineIndex))}
      </div>
    </div>
  );
};

export default FaqItemComponent;
