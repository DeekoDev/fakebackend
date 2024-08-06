import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { Home, Package, Settings, SquareArrowRight, Undo2 } from "lucide-react";
import { DashboardSidenavLink } from "./dashboard-sidenav-link";
import { DashboardSidenavEndpoint } from "./dashboard-sidenav-endpoint";
import { DashboardSidenavBack } from "./dashboard-sidenav-back";
import { Project } from "@prisma/client";
import { DashboardSidenavInfo } from "./dashboard-sidenav-info";
import { DashboardSidenavEndpointsContainer } from "./dashboard-sidenav-endpoints-container";
import { getServerAuthSession } from "@/server/auth";

interface Props {
  project: Project;
}

export const DashboardSidenav = async ({ project }: Props) => {
  const session = await getServerAuthSession();
  const isOwn = session?.user.id === project.authorId;

  return (
    <div className="flex w-full h-screen flex-col p-6">
      {/* Project info */}
      <DashboardSidenavInfo />

      <div className="mt-4 flex-grow border-t pt-4">
        <div className="flex flex-col">
          <DashboardSidenavLink
            icon={<Home className="h-full w-full" />}
            label="Home"
            href={`/dashboard/${project.id}`}
          />

          {isOwn && (
            <DashboardSidenavLink
              icon={<Settings className="h-full w-full" />}
              label="Settings"
              href={`/dashboard/${project.id}/settings`}
            />
          )}
        </div>

        <DashboardSidenavEndpointsContainer project={project} />
      </div>

      {/* back */}
      <DashboardSidenavBack />
    </div>
  );
};
