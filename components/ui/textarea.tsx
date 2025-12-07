import * as React from "react";
import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";

type TextareaProps = React.ComponentPropsWithoutRef<typeof TextareaAutosize>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosize
        className={cn(
          "placeholder:text-muted-foreground flex w-full border border-grey-secondary bg-white px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
