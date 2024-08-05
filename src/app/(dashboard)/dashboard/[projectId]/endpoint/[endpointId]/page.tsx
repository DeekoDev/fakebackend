import { ChevronDown, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EndpointHeader } from "@/components/dashboard/endpoint/endpoint-header";
import { EndpointForm } from "@/components/dashboard/endpoint/endpoint-form";
import { EndpointOperationsContainer } from "@/components/dashboard/endpoint/endpoint-operations-container";

interface Props {
  params: {
    projectId: string;
    endpointId: string;
  };
}

const DashboardEndpointPage = ({ params: { endpointId } }: Props) => {
  return (
    <div>
      <div className="relative mx-auto flex min-h-screen max-w-[800px] flex-col">
        {/* top bar */}
        <EndpointHeader endpointId={endpointId} />
        <EndpointOperationsContainer endpointId={endpointId} />
        <EndpointForm endpointId={endpointId} />
      </div>
    </div>
  );
};

export default DashboardEndpointPage;
