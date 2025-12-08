import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { PDFJS_DIST_VERSION } from "@/lib/consts";

interface PdfViewerProps {
  fileUrl: string;
}
const PdfViewer = ({ fileUrl }: PdfViewerProps) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className="size-full min-h-[200px] min-w-[300px]">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${PDFJS_DIST_VERSION}/build/pdf.worker.js`}>
        <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
};

export default PdfViewer;
