import { PDFJS_DIST_VERSION } from "@/lib/consts";
import type { PdfJsLib } from "@/types/pdfjs";
import { isPdfJsLib } from "./isPdfJsLib";

// Module-level singleton Promise to prevent multiple script tags
let pdfJsLoadPromise: Promise<PdfJsLib> | null = null;

/**
 * Load pdfjs-dist from CDN.
 * Uses a singleton pattern to prevent multiple script tags from being created.
 * @returns Promise that resolves to the pdfjsLib object
 */
export const loadPdfJs = async (): Promise<PdfJsLib> => {
  // Check if already loaded - return resolved promise immediately
  if (typeof window !== "undefined" && window.pdfjsLib && isPdfJsLib(window.pdfjsLib)) {
    return Promise.resolve(window.pdfjsLib);
  }

  // Return existing promise if one is already loading
  if (pdfJsLoadPromise) {
    return pdfJsLoadPromise;
  }

  // Create and assign the single Promise that loads the script
  pdfJsLoadPromise = new Promise<PdfJsLib>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://unpkg.com/pdfjs-dist@${PDFJS_DIST_VERSION}/build/pdf.min.js`;
    script.onload = () => {
      const pdfjsLib = window.pdfjsLib || window.pdfjs;
      if (!pdfjsLib || !isPdfJsLib(pdfjsLib)) {
        pdfJsLoadPromise = null; // Clear on error so it can be retried
        reject(new Error("Failed to load pdfjs-dist"));
        return;
      }
      // Store pdfjsLib - we'll pass workerSrc directly to getDocument
      window.pdfjsLib = pdfjsLib;
      // Retain promise on success so future calls get cached result
      resolve(pdfjsLib);
    };
    script.onerror = () => {
      pdfJsLoadPromise = null; // Clear on error so it can be retried
      reject(new Error("Failed to load pdfjs-dist script"));
    };
    document.head.appendChild(script);
  });

  return pdfJsLoadPromise;
};
