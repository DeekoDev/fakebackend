"use client";

import { cn } from "@/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";
import { ModalKey, useModal } from "../providers/modal-provider";
import { X } from "lucide-react";
import { Button } from "./button";

const modalVariants = cva(
  "mx-4 w-full bg-dark-800 border rounded-2xl p-6 shadow-lg shadow-zinc-950/50 z-40 animate-in slide-in-from-bottom-8 duration-200 overflow-hidden relative",
  {
    variants: {
      size: {
        sm: "max-w-[400px]",
        md: "max-w-[600px]",
        lg: "max-w-[800px]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
);

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  key: ModalKey;
}

const Modal = ({ className, children, size, ...props }: Props) => {
  const { close, isLocked } = useModal();

  return (
    <div className={cn(modalVariants({ size }), className)} {...props}>
      {!isLocked && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => {
            close();
          }}
          className="absolute right-5 top-5 z-40 p-1 text-gray-400 hover:text-gray-200 clicky"
        >
          <X className="h-5 w-5" />
        </Button>
      )}
      {children}
    </div>
  );
};

export { Modal };
