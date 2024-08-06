"use client";

import { useDashboard } from "@/components/providers/dashboard-provider";

interface Props {}

export const DashboardSidenavInfo = ({}: Props) => {
  const { project } = useDashboard();

  return (
    <div className="pb-4">
      <h2 className="font-medium text-lg">{project?.name || "no-name"}</h2>
      {project?.description && (
        <p className="mt-4 md:mt-1  overflow-hidden text-ellipsis text-sm text-light-600">
          {project.description}
        </p>
      )}
    </div>
  );
};
