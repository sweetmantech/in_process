const CHAIN_LOGOS: Record<number, { src: string; alt: string }> = {
  1: { src: "/icons/Ethereum.svg", alt: "Ethereum" },
  8453: { src: "/icons/Base.svg", alt: "Base" },
  84532: { src: "/icons/Base.svg", alt: "Base Sepolia" },
  7777777: { src: "/images/zorb.png", alt: "Zora" },
};

const getChainLogo = (chainId: number) => CHAIN_LOGOS[chainId] ?? null;

export default getChainLogo;
