const truncated = (text: string) => {
  return text.length > 20 ? `${text}...` : text;
};

export default truncated;
