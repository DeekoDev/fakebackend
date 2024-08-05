import { cn } from "@/utils/cn";
import { getMethodColor } from "@/utils/get-method-color";
import { cva, VariantProps } from "class-variance-authority";
import { useMemo } from "react";

const operationMethodVariants = cva("w-fit block rounded-full", {
  variants: {
    size: {
      default: "px-2 py-0.5 text-sm font-semibold",
      lg: "px-4 py-1 text-sm font-semibold",
      sm:"px-2 py-0.5 text-xs font-semibold"
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof operationMethodVariants> {
  method: string;
}

export const OperationMethod = ({
  method,
  className,
  size,
  style: _style,
  ...props
}: Props) => {
  const methodColor = useMemo(() => {
    return getMethodColor(method);
  }, [method]);

  return (
    <span
      className={cn(operationMethodVariants({ size }), className)}
      {...props}
      style={{
        backgroundColor: methodColor.background,
        color: methodColor.foreground,
        ..._style,
      }}
    >
      {method}
    </span>
  );
};
