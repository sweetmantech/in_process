"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { useZoraCreateProvider } from "@/providers/ZoraCreateProvider";

interface Position {
  x: number;
  y: number;
}

interface ImageEditorProps {
  src: string;
  alt: string;
}

const ImageEditor = ({ src, alt }: ImageEditorProps) => {
  const { previewPosition, setPreviewPosition, previewScale, setPreviewScale } = useZoraCreateProvider();
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - previewPosition.x,
      y: e.clientY - previewPosition.y,
    });
  }, [previewPosition]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    setPreviewPosition({ x: newX, y: newY });
  }, [isDragging, dragStart, setPreviewPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(0.5, Math.min(3, previewScale + delta));
    setPreviewScale(newScale);
  }, [previewScale, setPreviewScale]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video border border-grey overflow-hidden cursor-move bg-grey-moss-50"
      onMouseDown={handleMouseDown}
      onWheel={handleWheel}
    >
      <Image
        layout="fill"
        objectFit="cover"
        src={src}
        alt={alt}
        style={{
          transform: `translate(${previewPosition.x}px, ${previewPosition.y}px) scale(${previewScale})`,
          transition: isDragging ? "none" : "transform 0.1s ease-out",
        }}
        draggable={false}
      />
      {/* Crop overlay */}
      <div className="absolute inset-0 border-2 border-red-500 pointer-events-none">
        <div className="absolute inset-0 bg-black bg-opacity-20 pointer-events-none" />
      </div>
    </div>
  );
};

export default ImageEditor;
