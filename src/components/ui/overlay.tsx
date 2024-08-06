"use client";
import { cn } from "@/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";
import { useBodyLock } from "../providers/body-lock-provider";
import { useEffect } from "react";

const overlayVariants = cva("fixed inset-0 z-30", {
  variants: {
    variant: {
      default: "",
      zinc: "bg-black/80 animate-in fade-in-0",
      debug: "bg-red-900/80 animate-in fade-in-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof overlayVariants> {
  onClose?: () => void;
}

const Overlay = ({ className, style, children, variant, ...props }: Props) => {
  const { paddingRight } = useBodyLock();



  return (
    <div
      style={{
        ...style,
        paddingRight,
      }}
      className={cn(
        overlayVariants({
          variant,
        }),
        className
      )}
      {...props}>
      {/* Close trigger */}
      <div
        onClick={() => {
          props.onClose && props.onClose();
        }}
        className="absolute inset-0"
      />
      {children}
    </div>
  );
};

export { Overlay, overlayVariants };
