// Simple sanitization function that only allows <strong> tags
const sanitizeHTML = (text: string): string => {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<[^>]*>/g, (match) => {
      // Only allow <strong> tags
      if (match.toLowerCase() === '<strong>' || match.toLowerCase() === '</strong>') {
        return match;
      }
      return '';
    });
};

export const RenderLine = (line: string, lineIndex: number) => {
  if (line.trim() === "") {
    return <div key={lineIndex} className="mb-3"></div>;
  }

  const isBulletPoint = line.trim().startsWith("•");
  const sanitizedHTML = sanitizeHTML(line);

  return (
    <div key={lineIndex} className={`mb-1 ${isBulletPoint ? "ml-4" : ""}`}>
      <span
        className={`font-spectral text-[14px] md:text-[18px] lowercase text-[#1B1504] leading-[200%] tracking-[-0.05em] font-normal antialiased`}
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      />
    </div>
  );
}; 