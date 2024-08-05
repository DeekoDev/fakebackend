import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { AlertCircle, AlertTriangleIcon } from "lucide-react";

const alertVariants = cva(
  "p-3 rounded-lg border text-sm flex items-center gap-2",
  {
    variants: {
      type: {
        info: "bg-gray-900 border-gray-800 text-gray-300",
        danger: "border-red-500 bg-red-700/30 text-red-500",
      },
    },
    defaultVariants: {
      type: "info",
    },
  }
);

const ALERT_ICONS = {
  info: <AlertCircle className="w-4 h-4" />,
  danger: <AlertTriangleIcon className="w-4 h-4" />,
};

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof alertVariants>, "type"> {
  type: keyof typeof ALERT_ICONS;
}

export const Alert = ({ type, children, ...props }: Props) => {
  return (
    <div className={cn(alertVariants({ type }))} {...props}>
      {ALERT_ICONS[type]}
      <p>{children}</p>
    </div>
  );
};
