import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {}

export const NavbarActionsStarted = ({}: Props) => {
  return (
    <Link href="/api/auth/signin" className={buttonVariants({ size: "sm" })}>
      Get Started
      <ArrowRight className="h-4 w-4 hidden md:block" />
    </Link>
  );
};
