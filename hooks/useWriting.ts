import clientUploadToArweave from "@/lib/arweave/clientUploadToArweave";
import { useState } from "react";

// Text preview generation function (adapted from text-metadata.ts)
const generateTextPreview = async (text: string): Promise<File> => {
  const CHAR_LIMIT = 1111;
  const trimmedText = text.trim().slice(0, CHAR_LIMIT);

  const [width, height] = [500, 500];
  const padding = 20;
  const dpr = 2;

  const fontFamily = "Inter";
  const [fontSize, lineHeight] = [16, 24];
  const [textColor, backgroundColor] = ["black", "white"];

  const wrapText = ({
    ctx,
    text,
    x,
    y,
    maxWidth,
    lineHeight,
  }: {
    ctx: CanvasRenderingContext2D;
    text: string;
    x: number;
    y: number;
    maxWidth: number;
    lineHeight: number;
  }) => {
    let words = text.replaceAll("\n", " \n ").split(/ +/);
    let line = "";
    let testLine = "";
    const lineArray = [];

    for (let n = 0; n < words.length; n++) {
      testLine += `${words[n]} `;
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (words[n]?.includes("\n") || (testWidth > maxWidth && n > 0)) {
        lineArray.push({ text: line, x, y });
        y += lineHeight;
        
        if (words[n]?.includes("\n")) {
          line = ``;
          testLine = ``;
        } else {
          line = `${words[n]} `;
          testLine = `${words[n]} `;
        }
      } else {
        line += `${words[n]} `;
      }
      
      if (n === words.length - 1) {
        lineArray.push({ text: line, x, y });
      }
    }
    return lineArray;
  };

  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return reject(new Error("Could not create canvas context"));
    }
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width * dpr, height * dpr);
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize * dpr}px ${fontFamily}`;
    const wrapped = wrapText({
      ctx,
      text: trimmedText,
      x: padding * dpr,
      y: fontSize * dpr + padding * dpr,
      maxWidth: width * dpr - padding * 2 * dpr,
      lineHeight: lineHeight * dpr,
    });
    wrapped.forEach((line) => ctx.fillText(line.text, line.x, line.y));
    canvas.toBlob((blob) => {
      if (!blob) {
        return reject(new Error("Could not create blob"));
      }
      resolve(new File([blob], "text-preview.png", { type: "image/png" }));
    });
  });
};

const useWriting = () => {
  const [writingText, setWritingText] = useState<string>("");
  const [previewImageUri, setPreviewImageUri] = useState<string>("");

  const uploadWriting = async () => {
    const blob = new Blob([writingText], { type: "text/plain" });
    const writingFile = new File([blob], "writing.txt", { type: "text/plain" });
    const uri = await clientUploadToArweave(writingFile);
    return uri;
  };

  const generateAndUploadPreview = async () => {
    if (!writingText.trim()) return "";
    
    try {
      const previewFile = await generateTextPreview(writingText);
      const previewUri = await clientUploadToArweave(previewFile);
      setPreviewImageUri(previewUri);
      return previewUri;
    } catch (error) {
      console.error("Failed to generate text preview:", error);
      return "";
    }
  };

  const write = (value: string) => {
    setWritingText(value);
    // Clear preview when text changes
    setPreviewImageUri("");
  };

  return {
    writingText,
    setWritingText,
    write,
    uploadWriting,
    generateAndUploadPreview,
    previewImageUri,
  };
};

export default useWriting;
