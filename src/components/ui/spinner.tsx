import { cn } from "@/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";

const spinnerVariants = cva(
  "w-6 h-6 rounded-full relative border-transparent  border-4 animate-spin ",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
      },
      weight: {
        thin: "border-2",
        thick: "border-4",
      },
      variant: {
        default: "border-x-lime-500",
        light: "border-x-light-500",
        zinc: "border-x-zinc-900",
      },
      defaultVariants: {
        variant: "default",
        weight: "thick",
        size: "md",
      },
    },
  },
);

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = ({ variant, size, weight, ...props }: Props) => {
  return (
    <div
      className={cn(
        spinnerVariants({
          variant,
          size,
          weight,
        }),
      )}
      {...props}
    ></div>
  );
};

export { Spinner };
