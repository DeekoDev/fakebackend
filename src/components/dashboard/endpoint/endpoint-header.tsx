"use client";

import { useDashboard } from "@/components/providers/dashboard-provider";
import { useModal } from "@/components/providers/modal-provider";
import { OperationMethod } from "../../operation/operation-method";

interface Props {
  endpointId: string;
}

export const EndpointHeader = ({ endpointId }: Props) => {
  const { getEndpoint } = useDashboard();
  const endpoint = getEndpoint(endpointId);
  const modal = useModal();

  const handleClickURI = () => {
    modal.open("endpoint-definition", {
      endpoint,
    });
  };

  if (!endpoint) return;

  return (
    <div className="flex items-center justify-between gap-8 border-b py-6">
      <div className="flex items-start gap-3">
        <OperationMethod className="mt-1" method={endpoint.method} size="lg" />

        <div>
          <button
            onClick={handleClickURI}
            type="button"
            className="text-lg underline-offset-4 hover:underline"
          >
            {endpoint?.URI}
          </button>

          <p className="mt-1 line-clamp-2 text-light-600">
            {endpoint.description}
          </p>
        </div>
      </div>

      {/* todo: add edit endpoint */}
      {/* <Button variant="secondary">Edit</Button> */}
    </div>
  );
};
