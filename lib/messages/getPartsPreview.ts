export const getPartsPreview = (parts: unknown[]): string => {
  if (!parts || parts.length === 0) return "-";
  const firstPart = parts[0];
  if (typeof firstPart === "string") {
    return firstPart.length > 50 ? `${firstPart.slice(0, 50)}...` : firstPart;
  }
  if (typeof firstPart === "object" && firstPart !== null && "text" in firstPart) {
    const text = (firstPart as { text: string }).text;
    return text.length > 50 ? `${text.slice(0, 50)}...` : text;
  }
  return JSON.stringify(firstPart).slice(0, 50);
};
