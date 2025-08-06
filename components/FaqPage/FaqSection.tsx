import { FaqItem } from "@/lib/faq/faqContent";
import FaqItemComponent from "./FaqItemComponent";

interface FaqSectionProps {
  faqData: FaqItem[];
}

const FaqSection = ({ faqData }: FaqSectionProps) => {
  return (
    <div className="space-y-4 md:space-y-12">
      {faqData.map((faq, index) => (
        <FaqItemComponent key={index} faq={faq} index={index} />
      ))}
    </div>
  );
};

export default FaqSection;
