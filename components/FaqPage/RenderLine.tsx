import { sanitizeHTML } from "@/lib/faq/sanitizeHTML";

export const RenderLine = (line: string, lineIndex: number) => {
  if (line.trim() === "") {
    return <div key={lineIndex} className="mb-3"></div>;
  }

  const isBulletPoint = line.trim().startsWith("•");
  const sanitized = sanitizeHTML(line, false);

  return (
    <div key={lineIndex} className={`mb-1 ${isBulletPoint ? "ml-4" : ""}`}>
      <span
        className={`font-spectral text-[14px] font-normal lowercase leading-[200%] tracking-[-0.05em] text-[#1B1504] antialiased md:text-[18px]`}
        dangerouslySetInnerHTML={{ __html: sanitized }}
      />
    </div>
  );
};
