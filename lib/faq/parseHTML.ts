import parse from "html-react-parser";
import { sanitizeHTML } from "./sanitizeHTML";

/**
 * Safely parses HTML string into React elements
 * Sanitizes the HTML first to prevent XSS attacks
 * @param html - HTML string to parse
 * @param isEmbedCode - Whether this is embed code (allows more permissive HTML)
 * @returns React elements parsed from the HTML
 */
export const parseHTML = (html: string, isEmbedCode = false): ReturnType<typeof parse> => {
  const sanitized = sanitizeHTML(html, isEmbedCode);
  return parse(sanitized);
};
