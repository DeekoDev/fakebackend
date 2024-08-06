"use client";

import { useDashboard } from "@/components/providers/dashboard-provider";
import { EndpointCard } from "./endpoint-card";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/providers/modal-provider";

interface Props {}

export const EndpointHomeContainer = ({}: Props) => {
  const { endpoints, project, addEndpoint } = useDashboard();
  const { open } = useModal();

  const handleClickCreate = () => {
    open("endpoint-create", {
      project,
      addEndpoint,
    });
  };

  return (
    <div>
      <h2 className="mt-12 text-lg font-medium">Endpoints</h2>

      {endpoints.length === 0 && (
        <div>
          <p className="mt-1 text-light-600">Create your first endpoint!</p>
          <Button onClick={() => handleClickCreate()} className="mt-4">
            Create Endpoint
          </Button>
        </div>
      )}

      {endpoints.length > 0 && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {endpoints.map((endpoint) => {
            return <EndpointCard key={endpoint.id} {...endpoint} />;
          })}
        </div>
      )}
    </div>
  );
};
