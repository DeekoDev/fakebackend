import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const textareaVariants = cva(
  "bg-dark-500 p-3 border rounded-lg  outline-none disabled-input text-sm scrollbar",
);

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }: TextareaProps, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(textareaVariants(), className)}
        {...props}
      />
    );
  },
);
