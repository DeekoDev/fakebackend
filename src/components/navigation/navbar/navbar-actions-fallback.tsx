import { Skeleton } from "@/components/ui/skeleton";

interface Props {}

export const NavbarActionsFallback = ({}: Props) => {
  return <Skeleton className="h-10 w-32" />;
};
