/**
 * Escapes HTML entities in text (for plain text that should not contain HTML)
 */
export const escapeHTML = (text: string): string => {
  if (typeof window === "undefined") {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};
