"use client";
import { cn } from "@/utils/cn";
import { Endpoint, Project } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OperationMethod } from "../../operation/operation-method";

interface Props {
  endpoint: Endpoint;
  project: Project;
}

export const DashboardSidenavEndpoint = ({ endpoint, project }: Props) => {
  const pathname = usePathname();
  const isActive = pathname.includes(
    `/dashboard/${project.id}/endpoint/${endpoint.id}`,
  );

  return (
    <Link
      href={`/dashboard/${project.id}/endpoint/${endpoint.id}`}
      className={cn(
        "flex items-center gap-2 overflow-hidden rounded-lg p-3 text-sm transition-colors duration-100 ease-out",
        isActive ? "bg-dark-400" : "hover:bg-dark-500",
      )}
    >
      <OperationMethod method={endpoint.method} size="sm" />

      <span className="block overflow-hidden text-ellipsis text-nowrap">
        {endpoint.URI}
      </span>
    </Link>
  );
};
