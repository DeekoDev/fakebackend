import { ProjectCard } from "@/components/project/card/project-card";
import { api } from "@/trpc/server";

interface Props {}

const CommunityPage = async ({}: Props) => {
  const data = await api.project.getAllPublic();

  return (
    <div className="fluid-container mx-auto py-6">
      <h1 className="text-center text-xl font-medium">Community</h1>
      <p className="mt-2 text-center text-light-600">
        Explore the projects created by the community.
      </p>

      <div className="mt-8 grid grid-cols-3">
        {data.map((project) => {
          return <ProjectCard key={project.id} {...project} />;
        })}
      </div>
    </div>
  );
};

export default CommunityPage;
