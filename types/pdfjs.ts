/**
 * Minimal type definition for PDF.js library loaded from CDN.
 * Based on the actual usage in the codebase (getDocument, GlobalWorkerOptions).
 */
export interface PdfJsLib {
  getDocument: (params: { url: string; workerSrc: string }) => {
    promise: Promise<unknown>;
  };
  GlobalWorkerOptions?: {
    workerSrc?: string;
  };
}
