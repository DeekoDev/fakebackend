import Link from "next/link";
import { NavbarNavProjects } from "./navbar-nav-projects";
import { NavbarNavItem } from "./navbar-nav-item";

interface Props {}

export const NavbarNav = ({}: Props) => {
  return (
    <nav className="gap-5 hidden md:flex">
      <NavbarNavProjects />
      <NavbarNavItem href="/community">Community</NavbarNavItem>
    </nav>
  );
};
