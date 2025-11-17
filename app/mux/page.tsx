"use client";

import { ChangeEvent, useRef, useState } from "react";
import useMuxUpload from "@/hooks/useMuxUpload";

const MuxPage = () => {
  const { upload, uploading, error, pctComplete, playbackUrl } = useMuxUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      upload(selectedFile);
    } else {
      alert("Please select a file first");
    }
  };

  return (
    <main className="w-screen flex flex-col items-center justify-center pt-20 gap-4">
      <h1 className="text-4xl font-archivo-bold tracking-tight text-balance text-grey-moss-900">
        Mux Video Upload Prototype
      </h1>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="video/*"
        disabled={uploading}
        className="mt-4"
      />

      {selectedFile && (
        <p className="text-sm text-grey-moss-600">
          Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}

      <button
        className="bg-grey-moss-900 text-grey-eggshell p-2 rounded-md hover:bg-grey-eggshell hover:text-grey-moss-900 font-archivo mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
        onClick={handleUpload}
        disabled={uploading || !selectedFile}
      >
        {uploading ? `Uploading... ${Math.round(pctComplete)}%` : "Upload Video"}
      </button>

      {error && <p className="text-red-600 mt-4">Error: {error}</p>}

      {uploading && (
        <div className="w-64 h-2 bg-grey-moss-200 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-grey-moss-900 transition-all duration-300"
            style={{ width: `${pctComplete}%` }}
          />
        </div>
      )}

      {playbackUrl && (
        <div className="mt-8 p-6 bg-grey-eggshell border border-grey-moss-300 rounded-lg max-w-2xl w-full">
          <h2 className="text-xl font-archivo-bold text-grey-moss-900 mb-4">Upload Complete! 🎉</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-archivo-medium text-grey-moss-700 mb-1">Playback URL:</p>
              <a
                href={playbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline break-all"
              >
                {playbackUrl}
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm font-archivo-medium text-grey-moss-700 mb-2">Video Preview:</p>
              <video
                src={playbackUrl}
                controls
                className="w-full rounded-md"
                style={{ maxHeight: "400px" }}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MuxPage;
