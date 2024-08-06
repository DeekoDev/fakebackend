import Link from "next/link";
import { NavbarNavProjects } from "./navbar-nav-projects";
import { NavbarNavItem } from "./navbar-nav-item";
import { getServerAuthSession } from "@/server/auth";

interface Props {}

export const NavbarNav = async ({}: Props) => {
  const session = await getServerAuthSession();

  if (!session?.user) return null;

  return (
    <nav className="hidden gap-5 md:flex">
      <NavbarNavProjects />
      <NavbarNavItem href="/community">Community</NavbarNavItem>
    </nav>
  );
};
