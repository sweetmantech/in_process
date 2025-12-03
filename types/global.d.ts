export {};

declare global {
  interface Window {
    onNodeLabelChange: (nodeId: string, newLabel: string) => void;
    onEdgeLabelChange: (edgeId: string, newLabel: string) => void;
    pdfjsLib?: import("./pdfjs").PdfJsLib;
    pdfjs?: import("./pdfjs").PdfJsLib;
  }
}
