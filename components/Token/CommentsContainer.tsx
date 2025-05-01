import { ReactNode } from "react";

const CommentsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full mt-2 md:mt-10">
      <p className="text-lg font-archivo">comments</p>
      <div className="min-h-[300px] rounded-md mt-1 md:mt-4 py-5 px-6 relative rounded-md overflow-hidden bg-[#99999933]">
        {children}
      </div>
    </div>
  );
};

export default CommentsContainer;
