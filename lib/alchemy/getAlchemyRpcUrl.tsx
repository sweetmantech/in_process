import getAlchemyBaseUrl from "./getAlchemyBaseUrl";

const getAlchemyRpcUrl = (chainId: number) => {
  return `${getAlchemyBaseUrl(chainId)}v2/bm4Vy0AOr33hIewRojery5TXIHWcD1zT`;
};

export default getAlchemyRpcUrl;
