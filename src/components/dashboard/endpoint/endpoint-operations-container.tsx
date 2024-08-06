"use client";

import { useDashboard } from "@/components/providers/dashboard-provider";
import { OperationCard } from "../../operation/operation-card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  endpointId: string;
}

export const EndpointOperationsContainer = ({ endpointId }: Props) => {
  const {
    getEndpoint,
    endpointOperations,
    isPendingOperation,
    isFetchingOperation,
  } = useDashboard();
  const endpoint = getEndpoint(endpointId);

  if (!endpoint) return null;

  return (
    <div className="flex flex-grow flex-col gap-4 py-6">
      {isFetchingOperation && <Skeleton className="h-[300px]" />}

      {isPendingOperation && (
        <>
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </>
      )}

      {endpointOperations.map((operation) => {
        return <OperationCard key={operation.id} {...operation} />;
      })}
    </div>
  );
};
