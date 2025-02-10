"use client"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function HorizontalFeed() {
  const steps = [
    {
      id: 1,
      label: "Step 1",
      description: "Initial Planning Phase",
      date: "January 2024",
    },
    {
      id: 2,
      label: "Step 2",
      description: "Design & Development",
      date: "February 2024",
    },
    {
      id: 3,
      label: "Step 3",
      description: "Testing & Review",
      date: "March 2024",
    },
    {
      id: 4,
      label: "Step 4",
      description: "Implementation",
      date: "April 2024",
    },
    {
      id: 5,
      label: "Step 5",
      description: "Final Deployment",
      date: "May 2024",
    },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-center mb-12">In Process</h2>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 -translate-y-1/2" />

        {/* Timeline dots with tooltips */}
        <TooltipProvider>
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <Tooltip key={step.id}>
                <TooltipTrigger>
                  <div
                    className="w-4 h-4 rounded-full bg-black transition-transform duration-200 hover:scale-150"
                    aria-label={step.label}
                  />
                </TooltipTrigger>
                <TooltipContent className="flex flex-col gap-1">
                  <p className="font-semibold">{step.label}</p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <p className="text-xs text-muted-foreground">{step.date}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </div>
  )
}

