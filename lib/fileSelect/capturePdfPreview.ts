import base64ToFile from "@/lib/base64ToFile";

export interface PdfPreviewResult {
  previewFile: File;
}

// Load pdfjs-dist from CDN
const loadPdfJs = async () => {
  // Check if already loaded
  if (typeof window !== "undefined" && (window as any).pdfjsLib) {
    return (window as any).pdfjsLib;
  }

  // Load from CDN
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.min.js";
    script.onload = () => {
      const pdfjsLib = (window as any).pdfjsLib || (window as any).pdfjs;
      if (!pdfjsLib) {
        reject(new Error("Failed to load pdfjs-dist"));
        return;
      }
      // Store pdfjsLib - we'll pass workerSrc directly to getDocument
      (window as any).pdfjsLib = pdfjsLib;
      resolve(pdfjsLib);
    };
    script.onerror = () => reject(new Error("Failed to load pdfjs-dist script"));
    document.head.appendChild(script);
  });
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
          value: "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js",
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
      workerSrc: "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js",
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
