import { cn } from "@/utils/cn";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

interface Props {}

export const HomeExploreProjects = async ({}: Props) => {
  const session = await getServerAuthSession();

  return (
    <Link
      href={session?.user ? "/community" : "/api/auth/signin"}
      className={cn(buttonVariants(), "mt-8 w-fit")}
    >
      Explore Projects
    </Link>
  );
};
