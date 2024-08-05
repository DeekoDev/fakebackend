import react from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/utils/cn";

const logoVariants = cva(
  "flex items-center justify-center bg-sky-500 logo-clip",
  {
    variants: {
      size: {
        default: "sidenav-item lg:text-2xl font-semibold ",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface Props
  extends React.HTMLAttributes<HTMLDivElement | HTMLAnchorElement>,
    VariantProps<typeof logoVariants> {}

function Logo({ className, size, ...props }: Props) {
  return (
    <Link href={"/"} className={cn(logoVariants({ size }))}>
      s.ai
    </Link>
  );
}

export { Logo, logoVariants };
