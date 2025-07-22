import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSharedImageReposition } from "@/hooks/useSharedImageReposition";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ImageRepositionerProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageRepositioner = ({ src, alt, className = "" }: ImageRepositionerProps) => {
  const {
    position,
    scale,
    handleMouseDown,
    handleWheel,
    zoomIn,
    zoomOut,
    resetPosition,
  } = useSharedImageReposition();

  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      handleWheel(e);
    };

    container.addEventListener("wheel", wheelHandler, { passive: false });
    return () => container.removeEventListener("wheel", wheelHandler);
  }, [handleWheel]);

  const handleMouseDownWithDragState = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMouseDown(e);
    
    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      <div
        className="absolute inset-0"
        onMouseDown={handleMouseDownWithDragState}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: isDragging ? "none" : "transform 0.1s ease-out",
        }}
      >
        <Image
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          src={src}
          alt={alt}
          draggable={false}
          style={{ pointerEvents: "none" }}
        />
      </div>
      
      {/* Zoom Controls */}
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={zoomOut}
          className="w-8 h-8 bg-black bg-opacity-50 text-white rounded flex items-center justify-center hover:bg-opacity-70 transition-all"
          title="Zoom Out"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={zoomIn}
          className="w-8 h-8 bg-black bg-opacity-50 text-white rounded flex items-center justify-center hover:bg-opacity-70 transition-all"
          title="Zoom In"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={resetPosition}
          className="w-8 h-8 bg-black bg-opacity-50 text-white rounded flex items-center justify-center hover:bg-opacity-70 transition-all"
          title="Reset"
        >
          <RotateCcw size={16} />
        </button>
      </div>
      
      {/* Zoom Level Indicator */}
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
        {Math.round(scale * 100)}%
      </div>
    </div>
  );
};

export default ImageRepositioner; 