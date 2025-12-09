import { useState } from "react";

interface DescriptionProps {
  description: string;
  truncateLength?: number;
}

const Description = ({ description, truncateLength = 150 }: DescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  const shouldTruncate = description.length > truncateLength;
  const displayText =
    shouldTruncate && !isExpanded ? description.slice(0, truncateLength) + "..." : description;

  return (
    <div className="mt-3 md:mt-4">
      <p className="whitespace-pre-wrap font-archivo text-sm leading-relaxed text-grey-moss-300 md:text-base">
        {displayText}
      </p>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 font-archivo text-xs text-grey-moss-900 underline transition-colors hover:text-black md:text-sm"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default Description;
