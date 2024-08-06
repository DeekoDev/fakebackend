"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
  href: string;
}

export const NavbarNavItem = ({ children, href }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "clicky rounded-lg bg-dark-600 py-3 text-center active:bg-dark-500 md:rounded-none md:bg-transparent md:py-0",
        isActive
          ? "bg-dark-400 text-light-500 md:bg-transparent"
          : "text-light-600",
      )}
    >
      {children}
    </Link>
  );
};
