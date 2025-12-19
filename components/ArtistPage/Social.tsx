import React from "react";
import { validateUrl } from "@/lib/url/validateUrl";

interface SocialProps {
  link: string;
  icon: React.ReactNode;
}

const Social = ({ link, icon }: SocialProps) => {
  const handleClick = () => {
    // Validate URL before opening to prevent phishing
    if (validateUrl(link)) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button className="flex items-center gap-2" type="button" onClick={handleClick}>
      <div className="flex size-7 items-center justify-center rounded-md bg-grey-primary md:size-9">
        {icon}
      </div>
    </button>
  );
};

export default Social;
