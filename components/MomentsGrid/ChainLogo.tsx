import Image from "next/image";
import getChainLogo from "@/lib/getChainLogo";

interface ChainLogoProps {
  chainId: number;
}

const ChainLogo = ({ chainId }: ChainLogoProps) => {
  const chainLogo = getChainLogo(chainId);
  if (!chainLogo) return null;

  return (
    <div className="absolute top-1.5 right-1.5 z-20">
      <Image
        src={chainLogo.src}
        alt={chainLogo.alt}
        width={20}
        height={20}
        className="rounded-full opacity-90"
      />
    </div>
  );
};

export default ChainLogo;
