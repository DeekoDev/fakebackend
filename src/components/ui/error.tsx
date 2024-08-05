import { cn } from "@/utils/cn";
import { cva, VariantProps } from "class-variance-authority";
import { AlertTriangle } from "lucide-react";

const errorVariants = cva(
  "flex items-start rounded-lg border border-rose-500 bg-rose-700 text-light-400",
  {
    variants: {
      size: {
        default: " p-4 gap-3",
        sm: "p-2.5 text-sm gap-2.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof errorVariants> {
  children?: React.ReactNode;
  title?: string;
}

export const Error = ({
  children,
  title = "An error has occurred",
  className,
  size,
  ...props
}: Props) => {
  return (
    <div {...props} className={cn(errorVariants({ size }), className)}>
      <AlertTriangle
        className={cn("h-5 w-5 flex-shrink-0", children && "mt-1")}
      />
      <div>
        <h3 className="font-medium">{title}</h3>
        {children && <p>{children}</p>}
      </div>
    </div>
  );
};
