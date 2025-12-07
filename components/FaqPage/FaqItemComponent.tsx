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
      <h2 className="mb-4 font-archivo text-[20px] font-medium lowercase leading-[110%] tracking-[-0.05em] text-[#1b1504] antialiased md:text-[36px] md:leading-[160%]">
        {faq.question}
      </h2>
      <div className="max-w-6xl whitespace-pre-line font-spectral text-[14px] lowercase leading-[200%] tracking-[-0.05em] antialiased md:text-[18px]">
        {faq.answer.split("\n").map((line, lineIndex) => RenderLine(line, lineIndex))}
      </div>
    </div>
  );
};

export default FaqItemComponent;
