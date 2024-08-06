import { DashboardSidenav } from "@/components/dashboard/sidenav/dashboard-sidenav";
import { DashboardProvider } from "@/components/providers/dashboard-provider";
import { DashboardSidenavMobile } from "@/components/dashboard/sidenav/dashboard-sidenav-mobile";
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
      <DashboardSidenavMobile project={project}>
        <DashboardSidenav project={project} />
      </DashboardSidenavMobile>
      <div className="fixed left-0 top-0 hidden h-screen w-[250px] border-r lg:block">
        <DashboardSidenav project={project} />
      </div>
      <div className="lg:ml-[250px]">
        <div className="fluid-container mx-auto">{children}</div>
      </div>
    </DashboardProvider>
  );
};

export default Layout;
