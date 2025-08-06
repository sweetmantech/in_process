import { FaqItem } from "@/data/faqContent";

interface FaqItemComponentProps {
  faq: FaqItem;
  index: number;
}

const FaqItemComponent = ({ faq, index }: FaqItemComponentProps) => {
  const renderLine = (line: string, lineIndex: number) => {
    if (line.trim() === "") {
      return <div key={lineIndex} className="mb-3"></div>;
    }

    const isBulletPoint = line.trim().startsWith("•");

    const parts = line.split(/(<strong>.*?<\/strong>)/);

    return (
      <div key={lineIndex} className={`mb-1 ${isBulletPoint ? "ml-4" : ""}`}>
        <span
          className={`font-spectral text-[14px] md:text-[18px] lowercase text-[#1B1504] leading-[200%] tracking-[-0.05em] font-normal`}
          style={{
            WebkitFontSmoothing: "antialiased",
            MozOsxFontSmoothing: "grayscale",
          }}
        >
          {parts.map((part, partIndex) => {
            if (part.includes("<strong>")) {
              const boldText = part.replace(/<strong>|<\/strong>/g, "");
              return (
                <strong
                  key={partIndex}
                  className="font-spectral font-bold text-[14px] md:text-[18px] lowercase text-[#1B1504] leading-[200%] tracking-[-0.05em]"
                  style={{
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                  }}
                >
                  {boldText}
                </strong>
              );
            }
            return part;
          })}
        </span>
      </div>
    );
  };

  return (
    <div key={index} className="pb-6">
      <h2 className="font-archivo lowercase mb-4 text-[20px] leading-[110%] md:text-[36px] md:leading-[160%] font-medium tracking-[-0.05em] text-[#1b1504]">
        {faq.question}
      </h2>
      <div className="font-spectral whitespace-pre-line lowercase max-w-6xl text-[14px] leading-[200%] md:text-[18px] tracking-[-0.05em]">
        {faq.answer
          .split("\n")
          .map((line, lineIndex) => renderLine(line, lineIndex))}
      </div>
    </div>
  );
};

export default FaqItemComponent;
