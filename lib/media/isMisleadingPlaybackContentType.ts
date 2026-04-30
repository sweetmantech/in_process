const isMisleadingPlaybackContentType = (ct: string | null): boolean => {
  if (!ct) return false;
  const base = ct.split(";")[0]?.trim().toLowerCase() ?? "";
  return (
    base.includes("text/html") ||
    base === "application/json" ||
    base.endsWith("+json") ||
    base.startsWith("text/")
  );
};

export default isMisleadingPlaybackContentType;
