import { Logo } from "@/components/brand/logo";
import { NavbarActions } from "./navbar-actions";
import { NavbarNav } from "./navbar-nav";
import { Suspense } from "react";
import { NavbarActionsFallback } from "./navbar-actions-fallback";
import Link from "next/link";

interface Props {}

export const Navbar = ({}: Props) => {
  return (
    <div className="border-b">
      <div className="fluid-container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={"/"}>
            <Logo />
          </Link>
          <NavbarNav />
        </div>

        <Suspense fallback={<NavbarActionsFallback />}>
          <NavbarActions />
        </Suspense>
      </div>
    </div>
  );
};
