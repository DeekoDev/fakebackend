import { cn } from "@/utils/cn";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

interface Props {}

export const HomeExploreProjects = ({}: Props) => {
  return (
    <Link href={"/community"} className={cn(buttonVariants(), "mt-8 w-fit")}>
      Explore Projects
    </Link>
  );
};
