import React from "react";

interface SocialProps {
  link: string;
  icon: React.ReactNode;
}

const Social = ({ link, icon }: SocialProps) => {
  return (
    <button
      className="flex items-center gap-2"
      type="button"
      onClick={() => window.open(link, "_blank")}
    >
      <div className="flex size-7 items-center justify-center rounded-md bg-grey-primary md:size-9">
        {icon}
      </div>
    </button>
  );
};

export default Social;
