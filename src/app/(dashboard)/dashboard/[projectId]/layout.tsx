import { DashboardSidenav } from "@/components/dashboard/sidenav/dashboard-sidenav";
import { DashboardProvider } from "@/components/providers/dashboard-provider";
import { api } from "@/trpc/server";
import { notFound } from "next/navigation";

export const revalidate = 0;

interface Props {
  children: React.ReactNode;
  params: {
    projectId: string;
  };
}

const Layout = async ({ children, params: { projectId } }: Props) => {
  const project = await api.project.findById(projectId);

  if (!project) {
    return notFound();
  }

  const endpoints = await api.endpoint.findByProjectId(projectId);

  return (
    <DashboardProvider project={project} endpoints={endpoints}>
      <DashboardSidenav project={project} />
      <div className="ml-[250px]">
        <div className="fluid-container mx-auto">{children}</div>
      </div>
    </DashboardProvider>
  );
};

export default Layout;
