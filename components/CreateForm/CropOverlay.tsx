import React from "react";

interface CropOverlayProps {
  cropMode: boolean;
  cropStyle: React.CSSProperties;
  onMouseDown: (e: React.MouseEvent, type: "move" | "resize", handle?: string) => void;
}

const CropOverlay: React.FC<CropOverlayProps> = ({ cropMode, cropStyle, onMouseDown }) => {
  if (!cropMode) return null;

  return (
    <>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none" />

      {/* Crop selection */}
      <div
        className="absolute border-2 border-white shadow-lg cursor-move bg-transparent"
        style={cropStyle}
        onMouseDown={(e) => onMouseDown(e, "move")}
      >
        {/* Resize handles */}
        <div
          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-nw-resize z-10"
          style={{ top: "-6px", left: "-6px" }}
          onMouseDown={(e) => onMouseDown(e, "resize", "top-left")}
        />
        <div
          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-n-resize z-10"
          style={{
            top: "-6px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onMouseDown={(e) => onMouseDown(e, "resize", "top")}
        />
        <div
          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-ne-resize z-10"
          style={{ top: "-6px", right: "-6px" }}
          onMouseDown={(e) => onMouseDown(e, "resize", "top-right")}
        />
        <div
          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-e-resize z-10"
          style={{
            top: "50%",
            right: "-6px",
            transform: "translateY(-50%)",
          }}
          onMouseDown={(e) => onMouseDown(e, "resize", "right")}
        />
        <div
          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-se-resize z-10"
          style={{ bottom: "-6px", right: "-6px" }}
          onMouseDown={(e) => onMouseDown(e, "resize", "bottom-right")}
        />
        <div
          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-s-resize z-10"
          style={{
            bottom: "-6px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onMouseDown={(e) => onMouseDown(e, "resize", "bottom")}
        />
        <div
          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-sw-resize z-10"
          style={{ bottom: "-6px", left: "-6px" }}
          onMouseDown={(e) => onMouseDown(e, "resize", "bottom-left")}
        />
        <div
          className="absolute w-3 h-3 bg-white border border-gray-400 cursor-w-resize z-10"
          style={{
            top: "50%",
            left: "-6px",
            transform: "translateY(-50%)",
          }}
          onMouseDown={(e) => onMouseDown(e, "resize", "left")}
        />
      </div>
    </>
  );
};

export default CropOverlay; 