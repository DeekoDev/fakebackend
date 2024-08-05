import React from "react";
import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "bg-dark-500 border h-10 px-3 w-full rounded-lg outline-none disabled-input text-sm",
  {
    variants: {},
    defaultVariants: {},
  }
);

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">,
    VariantProps<typeof inputVariants> {
  type: "text" | "password" | "email";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(inputVariants(), className)}
        {...props}
      />
    );
  }
);

export { Input, inputVariants };
