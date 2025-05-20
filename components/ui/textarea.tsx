import * as React from "react";
import { cn } from "@/lib/utils";
import TextareaAutosize from "react-textarea-autosize";

type TextareaProps = React.ComponentPropsWithoutRef<typeof TextareaAutosize>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosize
        className={cn(
          "flex w-full border border-grey-secondary bg-white px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
