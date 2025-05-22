import React from "react";

interface SocialProps {
  link: string;
  icon: React.ReactNode;
}

const Social = ({ link, icon }: SocialProps) => {
  return (
    <button
      className="flex gap-2 items-center"
      type="button"
      onClick={() => window.open(link, "_blank")}
    >
      <div className="flex size-7 md:size-9 bg-grey-primary flex items-center justify-center rounded-md">
        {icon}
      </div>
    </button>
  );
};

export default Social;
