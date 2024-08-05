"use client";
import { Button } from "@/components/ui/button";
import { DashboardSidenavEndpoint } from "./dashboard-sidenav-endpoint";
import { DashboardSidenavEndpointCreate } from "./dashboard-sidenav-endpoint-create";
import { Project } from "@prisma/client";
import { useDashboard } from "@/components/providers/dashboard-provider";

interface Props {
  project: Project;
}

export const DashboardSidenavEndpointsContainer = ({ project }: Props) => {
  const { endpoints } = useDashboard();

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex flex-col">
        {endpoints.map((endpoint) => (
          <DashboardSidenavEndpoint
            key={endpoint.id}
            endpoint={endpoint}
            project={project}
          />
        ))}
      </div>
      <DashboardSidenavEndpointCreate />
    </div>
  );
};
