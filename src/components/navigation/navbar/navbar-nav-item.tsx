import Link from "next/link";

interface Props {}

export const NavbarNavItem = ({}: Props) => {
  return (
    <Link href="#" className="text-light-600">
      Community
    </Link>
  );
};
