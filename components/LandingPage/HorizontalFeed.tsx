"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function HorizontalFeed() {
  const steps = [
    {
      id: 1,
      description: "Initial Planning Phase",
    },
    {
      id: 2,
      description: "Design & Development",
    },
    {
      id: 3,
      description: "Testing & Review",
    },
    {
      id: 4,
      description: "Implementation",
    },
    {
      id: 5,
      description: "Final Deployment",
    },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -translate-y-1/2" />
        <TooltipProvider>
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <Tooltip key={step.id}>
                <TooltipTrigger>
                  <div
                    className="w-4 h-4 rounded-full bg-black transition-transform duration-200 hover:scale-150"
                    aria-label={step.description}
                  />
                </TooltipTrigger>
                <TooltipContent className="flex flex-col gap-1">
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
}
