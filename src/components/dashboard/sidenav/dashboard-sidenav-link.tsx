"use client";

import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export const DashboardSidenavLink = ({ icon, label, href }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-lg p-3 text-sm transition-colors duration-100 ease-in hover:bg-dark-500",
        isActive && "bg-dark-400 "
      )}
    >
      <span className="block h-5 w-5 text-light-600">{icon}</span>
      {label}
    </Link>
  );
};
