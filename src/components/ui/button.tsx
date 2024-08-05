import { cn } from "@/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "disabled-input rounded-lg flex gap-1.5 items-center clicky",
  {
    variants: {
      variant: {
        default:
          "bg-green-700 hover:bg-green-700/80 border border-green-400  text-light-400 font-semibold",
        secondary:
          "bg-dark-500 border hover:bg-dark-400  text-light-500 font-medium",
        outline: "bg-transparent border hover:bg-dark-400 font-medium",

        ghost: "bg-transparent hover:bg-dark-500 font-medium",
        danger: "bg-red-700/20 hover:bg-dark-700/30 text-red-500",
      },
      size: {
        default: "h-10 text-sm px-4",
        lg: "h-11 px-6",
        sm: "h-8 text-sm  px-4",
        icon: "h-10 w-10 justify-center items-center rounded-lg",
        "icon-sm": "h-8 w-8 justify-center items-center rounded-full",
        "icon-lg": "h-12 w-12 justify-center items-center rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({ className, size, variant, ...props }: Props) => {
  return (
    <button
      className={cn(
        buttonVariants({ size, variant }),
        className,
        "cursor-pointer",
      )}
      {...props}
    />
  );
};

export { Button, buttonVariants };
