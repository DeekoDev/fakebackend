"use client";
import { useDashboard } from "@/components/providers/dashboard-provider";

interface Props {}

export const DashboardHomeInfo = ({}: Props) => {
  const { project } = useDashboard();

  return (
    <div>
      <h1 className="text-2xl font-medium">{project?.name}</h1>
      <p className="mt-2 text-light-600">{project?.description}</p>
    </div>
  );
};
