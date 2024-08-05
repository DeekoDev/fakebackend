import { EndpointHomeContainer } from "@/components/dashboard/endpoint/endpoint-home-container";
import { DashboardHomeApiKeys } from "@/components/dashboard/home/dashboard-home-apikeys";
import { Button } from "@/components/ui/button";
import { Copy, Eye, Trash } from "lucide-react";

interface Props {}

const DashboardPage = ({}: Props) => {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-medium">Anime Wiki</h1>
      <p className="mt-2 text-light-600">Get your favorite anime information</p>

      {/* API KEY */}
      <DashboardHomeApiKeys />
      <EndpointHomeContainer />
    </div>
  );
};

export default DashboardPage;
