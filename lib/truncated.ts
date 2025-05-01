const truncated = (text: string, visibility: number | undefined = 20) => {
  return text.length > visibility ? `${text.slice(0, visibility)}...` : text;
};

export default truncated;
