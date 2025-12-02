import base64ToFile from "@/lib/base64ToFile";
import { PDFJS_DIST_VERSION } from "@/lib/consts";

export interface PdfPreviewResult {
  previewFile: File;
}

// Module-level singleton Promise to prevent multiple script tags
let pdfJsLoadPromise: Promise<any> | null = null;

// Load pdfjs-dist from CDN
const loadPdfJs = async () => {
  // Check if already loaded - return resolved promise immediately
  if (typeof window !== "undefined" && (window as any).pdfjsLib) {
    return Promise.resolve((window as any).pdfjsLib);
  }

  // Return existing promise if one is already loading
  if (pdfJsLoadPromise) {
    return pdfJsLoadPromise;
  }

  // Create and assign the single Promise that loads the script
  pdfJsLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://unpkg.com/pdfjs-dist@${PDFJS_DIST_VERSION}/build/pdf.min.js`;
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib || (window as any).pdfjs;
      if (!pdfjsLib) {
        pdfJsLoadPromise = null; // Clear on error so it can be retried
        reject(new Error("Failed to load pdfjs-dist"));
        return;
      }
      // Store pdfjsLib - we'll pass workerSrc directly to getDocument
      (window as any).pdfjsLib = pdfjsLib;
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

export const capturePdfPreview = async (file: File): Promise<PdfPreviewResult> => {
  const pdfUrl = URL.createObjectURL(file);

  try {
    // Load pdfjs-dist from CDN
    const pdfjsLib: any = await loadPdfJs();

    // Set worker source if GlobalWorkerOptions exists and is writable
    try {
      if (pdfjsLib.GlobalWorkerOptions && pdfjsLib.GlobalWorkerOptions.workerSrc === undefined) {
        Object.defineProperty(pdfjsLib.GlobalWorkerOptions, "workerSrc", {
          value: `https://unpkg.com/pdfjs-dist@${PDFJS_DIST_VERSION}/build/pdf.worker.js`,
          writable: true,
          configurable: true,
        });
      }
    } catch {
      // If we can't set GlobalWorkerOptions, pass workerSrc directly to getDocument
    }

    // Load PDF document with worker source
    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrl,
      workerSrc: `https://unpkg.com/pdfjs-dist@${PDFJS_DIST_VERSION}/build/pdf.worker.js`,
    });
    const pdf = await loadingTask.promise;

    // Get first page
    const page = await pdf.getPage(1);

    // Set up canvas for rendering
    const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better quality
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Unable to get canvas context");
    }

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page to canvas
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;

    // Convert canvas to base64 image
    const imageBase64 = canvas.toDataURL("image/png");

    if (!imageBase64) {
      throw new Error("Unable to capture preview from PDF");
    }

    // Convert base64 to File
    const imageFile = base64ToFile(imageBase64, file.name);

    return {
      previewFile: imageFile,
    };
  } finally {
    URL.revokeObjectURL(pdfUrl);
  }
};
