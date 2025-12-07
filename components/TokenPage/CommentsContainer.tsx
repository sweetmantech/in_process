import { ReactNode } from "react";

const CommentsContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-2 w-full md:mt-10">
      <p className="font-archivo text-lg">comments</p>
      <div className="no-scrollbar relative mt-1 max-h-[300px] min-h-[300px] overflow-hidden overflow-y-auto rounded-md bg-[#99999933] px-6 py-5 md:mt-4">
        {children}
      </div>
    </div>
  );
};

export default CommentsContainer;
