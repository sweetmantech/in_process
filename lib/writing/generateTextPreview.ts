// Text preview generation function (matching production OG route styling)
export const generateTextPreview = async (text: string): Promise<File> => {
  const trimmedText = text.trim();

  // Use same dimensions as OG route
  const width = 500;
  const height = 333;
  const padding = 32;
  const dpr = 2;

  // Calculate total lines using same logic as OG route
  const paragraphs = trimmedText.split("\n");
  let totalLines = 0;
  paragraphs.forEach((paragraph) => {
    totalLines += Math.max(1, parseInt(Number(paragraph.length / 64).toFixed()) + 1);
  });

  // Dynamic font size based on line count (same logic as OG route)
  const WRITING_SHORT_LINES = 3;
  const fontSize = totalLines <= WRITING_SHORT_LINES ? 32 : 16;
  const lineHeight = fontSize * 1.2; // Reasonable line height

  // Production colors and fonts
  const backgroundColor = "#E0DDD8"; // Same beige/tan as production
  const textColor = "#000000";
  const fontFamily = "Spectral, serif"; // Same font as production

  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return reject(new Error("Could not create canvas context"));
    }

    // Set background to match production
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width * dpr, height * dpr);

    // Set text styling to match production
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize * dpr}px ${fontFamily}`;
    ctx.textBaseline = "top";

    // Calculate text placement (matching OG route layout)
    const textX = padding * dpr;
    const availableWidth = (width - padding * 2) * dpr;
    const availableHeight = (height - padding * 2) * dpr;

    // Simple text wrapping that respects newlines
    const lines: string[] = [];
    paragraphs.forEach((paragraph) => {
      if (paragraph === "") {
        lines.push("");
        return;
      }
      
      const words = paragraph.split(" ");
      let currentLine = "";
      
      words.forEach((word) => {
        const testLine = currentLine + (currentLine ? " " : "") + word;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > availableWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
      
      if (currentLine) {
        lines.push(currentLine);
      }
    });

    // Calculate starting Y position for centering (for short text) or top alignment
    const totalTextHeight = lines.length * lineHeight * dpr;
    const startY = totalLines <= WRITING_SHORT_LINES 
      ? padding * dpr + Math.max(0, (availableHeight - totalTextHeight) / 2)
      : padding * dpr;

    // Draw text lines
    lines.forEach((line, index) => {
      const y = startY + (index * lineHeight * dpr);
      if (y < height * dpr - padding * dpr) { // Don't draw below bottom padding
        ctx.fillText(line, textX, y);
      }
    });

    canvas.toBlob((blob) => {
      if (!blob) {
        return reject(new Error("Could not create blob"));
      }
      resolve(new File([blob], "text-preview.png", { type: "image/png" }));
    });
  });
};