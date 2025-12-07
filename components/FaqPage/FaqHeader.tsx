import Image from "next/image";
const FaqHeader = () => {
  return (
    <div className="mb-6 flex flex-col md:mb-16 md:flex-row md:items-start md:justify-between">
      <h1 className="relative z-[2] font-archivo text-[24px] font-medium lowercase leading-[110%] tracking-[-0.05em] text-[#1b1504] md:text-[48px] md:leading-[100%]">
        in•process: faq
      </h1>
      <div className="mt-4 text-left font-spectral text-[16px] font-medium lowercase italic leading-[100%] tracking-[-0.05em] text-[#1b1504] md:text-right md:text-[24px] md:text-[#4e4e4e]">
        a collective timeline for creative culture
      </div>
      <div className="mt-5 flex justify-center md:mt-10 md:hidden">
        <Image
          src="/images/faq/faq_line.svg"
          alt="faq line"
          width={378}
          height={36}
          className="h-auto w-auto max-w-full"
        />
      </div>
    </div>
  );
};

export default FaqHeader;
