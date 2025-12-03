import type { PdfJsLib } from "@/types/pdfjs";

/**
 * Type guard to validate that the value is a valid PdfJsLib object.
 */
export const isPdfJsLib = (value: unknown): value is PdfJsLib => {
  return (
    typeof value === "object" &&
    value !== null &&
    "getDocument" in value &&
    typeof (value as PdfJsLib).getDocument === "function"
  );
};
