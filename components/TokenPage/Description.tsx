import { useState } from "react";

interface DescriptionProps {
  description: string;
  truncateLength?: number;
}

const Description = ({ description, truncateLength = 150 }: DescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!description) return null;
  
  const shouldTruncate = description.length > truncateLength;
  const displayText = shouldTruncate && !isExpanded 
    ? description.slice(0, truncateLength) + "..." 
    : description;

  return (
    <div className="mt-3 md:mt-4">
      <p className="font-archivo text-sm md:text-base text-grey-moss-300 leading-relaxed whitespace-pre-wrap">
        {displayText}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-xs md:text-sm font-archivo text-grey-moss-900 hover:text-black transition-colors underline"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default Description;
