const convertIpfsToHttp = (ipfsUrl: string) => {
  if (!ipfsUrl.startsWith("ipfs://")) return ipfsUrl;
  return ipfsUrl.replace(
    "ipfs://",
    "https://ipfs.decentralized-content.com/ipfs/",
  );
};

export default convertIpfsToHttp;
