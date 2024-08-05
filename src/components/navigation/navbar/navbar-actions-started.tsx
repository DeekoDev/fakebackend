import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {}

export const NavbarActionsStarted = ({}: Props) => {
  return (
    <Link href="/api/auth/signin" className={buttonVariants()}>
      Get Started
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
};
