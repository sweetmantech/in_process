"use client";

import { useTokenProvider } from "@/providers/TokenProvider";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Media = () => {
  const { metadata } = useTokenProvider();
  const { data: meta, isLoading } = metadata;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    animationUrl: "",
  });

  useEffect(() => {
    if (meta) {
      setFormData({
        title: meta.name || "",
        description: meta.description || "",
        image: meta.image || "",
        animationUrl: meta.animation_url || "",
      });
    }
  }, [meta]);

  if (isLoading || !meta) {
    return (
      <div className="px-4 md:px-10 w-full pt-4">
        <div className="animate-pulse">
          <div className="h-4 bg-grey-moss-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-grey-moss-200 rounded mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-grey-moss-200 rounded"></div>
            <div className="h-4 bg-grey-moss-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="px-4 md:px-10 w-full font-archivo">
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mt-4">
        <div className="space-y-6">
          <div>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="font-archivo text-sm text-grey-moss-600 block mb-1">
                  title
                </label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="enter a title"
                />
              </div>

              <div>
                <label className="font-archivo text-sm text-grey-moss-600 block mb-1">
                  description
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="font-archivo focus:border-grey-moss-500"
                  minRows={3}
                  placeholder="enter a description"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Media;
