import dynamic from "next/dynamic";

const ContentRenderer = dynamic(() => import("./ContentRendererInner"), {
  ssr: false,
});

export default ContentRenderer;
