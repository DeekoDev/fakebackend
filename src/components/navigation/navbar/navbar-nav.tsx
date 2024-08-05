import Link from "next/link";
import { NavbarNavProjects } from "./navbar-nav-projects";
import { NavbarNavItem } from "./navbar-nav-item";

interface Props {}

export const NavbarNav = ({}: Props) => {
  return (
    <nav className="flex gap-5">
      <NavbarNavProjects />
      <NavbarNavItem />
    </nav>
  );
};
