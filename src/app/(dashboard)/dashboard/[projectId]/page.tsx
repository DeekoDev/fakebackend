import { EndpointHomeContainer } from "@/components/dashboard/endpoint/endpoint-home-container";
import { DashboardHomeApiKeys } from "@/components/dashboard/home/dashboard-home-apikeys";
import { DashboardHomeInfo } from "@/components/dashboard/home/dashboard-home-info";
import { Button } from "@/components/ui/button";
import { Copy, Eye, Trash } from "lucide-react";

interface Props {}

const DashboardPage = ({}: Props) => {
  return (
    <div className="py-8">
      <DashboardHomeInfo />

      {/* API KEY */}
      <DashboardHomeApiKeys />
      <EndpointHomeContainer />
    </div>
  );
};

export default DashboardPage;
