const parseZoraUrl = (url: string) => {
  try {
    if (url.includes("zora.co/collect/")) {
      const match = url.match(/collect\/([\w]+):([^/?]+)/);
      if (match) {
        return `${match[1]}:${match[2]}`;
      }
    }
    return url;
  } catch (error) {
    console.error("Error parsing Zora URL", error);
    return url;
  }
};

export default parseZoraUrl;
