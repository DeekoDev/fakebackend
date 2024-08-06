import { CreateProjectButton } from "@/components/profile/create-project-button";
import { ProjectCard } from "@/components/project/card/project-card";
import { Button } from "@/components/ui/button";
import { USER_DEFAULT_IMAGE } from "@/constants/user.constants";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { Plus, SquareArrowOutUpRight } from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: {
    username: string;
  };
}

const ProfilePage = async ({ params: { username } }: Props) => {
  const session = await getServerAuthSession();
  const user = await api.user.findByUsername(username);

  if (!user) {
    return notFound();
  }

  const projects = await api.project.findByUsername(username);
  const isOwner = session?.user.username === username;

  return (
    <div>
      <div className="relative -mt-0.5 border-b bg-dark-800">
        <div className="fluid-container bottom mx-auto flex items-center gap-6 py-8">
          <img
            className="aspect-[1/1] w-[80px] rounded-full object-cover object-top"
            src={user?.image || USER_DEFAULT_IMAGE}
            alt={`${user?.name}'s profile picture`}
          />

          <div className="">
            <h1 className="text-xl font-medium leading-tight">{user?.name}</h1>
            <h1 className="mt-1 leading-tight text-light-600">
              @{user?.username}
            </h1>
          </div>
        </div>
      </div>

      <div className="fluid-container mx-auto mt-6">
        <h1 className="text-xl font-medium">Projects</h1>
        {projects.length === 0 && (
          <div>
            <p className="mt-2 text-light-600">
              {isOwner
                ? "You don't have any projects yet."
                : "No projects found."}
            </p>

            {isOwner && <CreateProjectButton />}
          </div>
        )}

        {projects.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => {
              return <ProjectCard key={project.id} {...project} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
