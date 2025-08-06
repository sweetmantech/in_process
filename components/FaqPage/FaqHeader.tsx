import Image from "next/image";
const FaqHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 md:mb-16">
      <h1 className="font-archivo lowercase relative z-[2] text-[24px] leading-[110%] md:text-[48px] md:leading-[100%] font-medium tracking-[-0.05em] text-[#1b1504]">
        in process: faq
      </h1>
      <div className="font-spectral italic lowercase text-left md:text-right mt-4 text-[16px] leading-[100%] md:text-[24px] font-medium tracking-[-0.05em] text-[#1b1504] md:text-[#4e4e4e]">
        a collective timeline for creative culture onchain
      </div>
      <div className="flex justify-center md:mt-10 mt-5 md:hidden">
        <Image
          src="/images/faq/faq_line.svg"
          alt="faq line"
          width={378}
          height={36}
          className="w-auto h-auto max-w-full"
        />
      </div>
    </div>
  );
};

export default FaqHeader;
