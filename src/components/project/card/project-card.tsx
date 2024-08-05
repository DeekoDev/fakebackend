import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";
import { MoveRight, SquareArrowOutUpRight, Star } from "lucide-react";
import Link from "next/link";

interface Props extends Project {}

export const ProjectCard = ({ name, description, id }: Props) => {
  return (
    <Link href={`/dashboard/${id}`}>
      <article className="relative z-0 rounded-lg border bg-dark-600 p-4  pb-8 transition-colors duration-100 hover:bg-dark-500">
        <div>
          <p className="text-lg font-medium">{name ?? "Mango"}</p>
        </div>

        {/* Content */}
        {description && (
          <p className="line-clamp-2 text-light-600">{description}</p>
        )}
      </article>
    </Link>
  );
};
