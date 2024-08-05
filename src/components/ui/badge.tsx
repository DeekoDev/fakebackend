import react from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import Link from "next/link";

const badgeVariants = cva("rounded-full shrink-0 w-fit  flex items-center", {
  variants: {
    variant: {
      default: "bg-gray-800 text-gray-400",
      light: "bg-gray-700  text-gray-300 ",
      nsfw: "bg-red-950/90 text-red-500",
      primary: "bg-sky-500 text-gray-200 font-semibold",
      "primary-muted": "bg-sky-700/30 text-sky-300",
    },
    interactive: {
      off: "",
      on: "hover:opacity-80 cursor-pointer",
    },
    size: {
      default: "px-3 h-8 text-sm",
      sm: "px-2 h-7 text-xs",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
    interactive: "off",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement | HTMLAnchorElement>,
    VariantProps<typeof badgeVariants> {
  href?: string;
  asAnchorLink?: boolean;
}

function Badge({
  className,
  asAnchorLink,
  size,
  variant,
  href,
  ...props
}: BadgeProps) {
  if (href && asAnchorLink) {
    return (
      <a
        href={href}
        className={cn(
          badgeVariants({ variant, size, interactive: "on" }),
          className
        )}
        {...props}
      />
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          badgeVariants({ variant, size, interactive: "on" }),
          className
        )}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(badgeVariants({ size, variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
